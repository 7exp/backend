import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const fyp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { page = 1, pageSize = 10 } = req.query;

    if (!id) {
      res.status(400).json({ message: "UserId is required!" });
    }

    // Menghitung offset berdasarkan nomor halaman dan ukuran halaman
    const offset = (Number(page) - 1) * Number(pageSize);

    // Mengambil semua kerajinan tangan dan data terkait dengan pagination
    const allHandicrafts = await prisma.handicraft.findMany({
      include: {
        users: true,
        likes: true,
        tag_handicraft: {
          include: {
            tag: true,
          },
        },
        history_handicraft: {
          where: {
            id_user: id,
          },
        },
      },
      skip: offset,
      take: Number(pageSize),
    });

    // Mengambil hanya 30 data teratas dari hasil query
    const limitedHandicrafts = allHandicrafts.slice(0, 30);

    // Mengambil semua tag yang dimiliki oleh pengguna dari semua kerajinan tangan
    const userTags: string[] = limitedHandicrafts.reduce((acc: string[], curr) => {
      curr.tag_handicraft.forEach((th) => {
        if (!acc.includes(th.tag.name)) {
          acc.push(th.tag.name);
        }
      });
      return acc;
    }, []);

    // Memfilter kerajinan tangan berdasarkan tag yang sama atau mirip
    const filteredHandicrafts = limitedHandicrafts.filter((h) => {
      const handicraftTags = h.tag_handicraft.map((th) => th.tag.name);
      return (handicraftTags.some((tag) => userTags.includes(tag)) || h.history_handicraft.some((history) => history.id_user === id)) && h.id_user !== id; // Mengecualikan kerajinan tangan yang dibuat oleh pengguna itu sendiri
    });

    // Menghitung jumlah likes dan metrik lainnya
    const handicraftMetrics = filteredHandicrafts.map((h) => ({
      ...h,
      likesCount: h.likes.length,
      tags: h.tag_handicraft.map((th) => th.tag.name),
    }));

    // Mengurutkan berdasarkan kriteria (likes oleh pengguna, likes oleh orang lain, dan riwayat pengguna)
    const sortedHandicrafts = handicraftMetrics.sort((a, b) => {
      // Logika peringkat khusus di sini
      const aUserLikes = a.likes.filter((like) => like.id_user === id).length;
      const bUserLikes = b.likes.filter((like) => like.id_user === id).length;

      if (aUserLikes !== bUserLikes) return bUserLikes - aUserLikes;
      if (a.likesCount !== b.likesCount) return b.likesCount - a.likesCount;

      const aUserHistory = a.history_handicraft.length;
      const bUserHistory = b.history_handicraft.length;

      return bUserHistory - aUserHistory;
    });

    // Memformat data respons
    const recommendedHandicrafts = await Promise.all(
      sortedHandicrafts.map(async (h) => {
        const user = await prisma.users.findUnique({ where: { id: h.id_user } });
        const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: h.id } });
        const wasteNames = await prisma.waste.findMany({ where: { id: { in: waste.map((w) => w.id_waste) } } });
        const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: h.id } });
        // filter data where id_user = id do not show
        // filteredHandicrafts.filter((h) => h.id_user !== id);

        return {
          id: h.id,
          name: h.name,
          description: h.description,
          image: h.image,
          id_user: h.id_user,
          createdAt: h.createdAt,
          updatedAt: h.updatedAt,
          createdBy: user?.name,
          image_user: user?.image,
          waste: wasteNames.map((w) => w.name),
          tags: h.tags,
          likes: h.likesCount,
          totalStep,
        };
      })
    );

    // Menghitung total jumlah data untuk pagination
    const totalCount = await prisma.handicraft.count();

    // Menghitung jumlah halaman terakhir berdasarkan total data dan ukuran halaman
    const lastPage = Math.ceil(totalCount / Number(pageSize)); // Karena kita menetapkan 10 data per halaman

    res.status(200).json({
      message: "Successfully fetched FYP wkwkwkk",
      data: recommendedHandicrafts,
      pagination: {
        page: Number(page),
        pageSize,
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error while fetching FYP", error: error.message });
  }
};

// tranding handicraft
export const trendingHandicrafts = async (req: Request, res: Response) => {
  try {
    // Get the date one month ago from today
    const oneMonthAgo = new Date();
    oneMonthAgo.setMonth(oneMonthAgo.getMonth() - 1);

    // Get pagination parameters
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = Math.min(parseInt(req.query.pageSize as string) || 10, 50); // Ensure pageSize is not more than 50

    const totalCount = await prisma.handicraft.count({
      where: {
        likes: {
          some: {
            createdAt: {
              gte: oneMonthAgo,
            },
          },
        },
      },
    });

    const offset = (page - 1) * pageSize;

    const handicrafts = await prisma.handicraft.findMany({
      where: {
        likes: {
          some: {
            createdAt: {
              gte: oneMonthAgo,
            },
          },
        },
      },
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: pageSize,
      skip: offset,
    });
    const data = await Promise.all(
      handicrafts.map(async (handicraft) => {
        const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
        const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const likes = await prisma.likes.count({ where: { id_handicraft: handicraft.id } });
        const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: handicraft.id } });

        const data = {
          ...handicraft,
          createdBy: user[0].name,
          image_user: user[0].image,
          waste: waste.map((waste) => waste.id_waste),
          tags: tags.map((tag) => tag.id_tag),
          likes,
          totalStep,
        };
        const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
        data.waste = wasteName.map((waste) => waste.name);

        const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
        data.tags = tagsName.map((tag) => tag.name);

        return data;
      })
    );
    const lastPage = Math.ceil(totalCount / pageSize);

    // Send response with data and pagination information
    res.status(200).json({
      message: "Successfully fetched Handicrafts trending",
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error while fetching Handicrafts trending", error: error.message });
  }
};

// continue
export const continueHandicraft = async (req: Request, res: Response) => {
  try {
    const page = parseInt(req.query.page as string) || 1;
    const pageSize = parseInt(req.query.pageSize as string) || 10;

    const totalCount = await prisma.handicraft.count({
      where: {
        history_handicraft: {
          some: {
            done: false,
          },
        },
      },
    });

    const offset = (page - 1) * pageSize;

    const handicrafts = await prisma.handicraft.findMany({
      where: {
        history_handicraft: {
          some: {
            done: false,
          },
        },
      },

      orderBy: {
        likes: {
          _count: "desc",
        },
      },
      take: pageSize,
      skip: offset,
    });

    if (handicrafts.length === 0) {
      return res.status(200).json({
        message: "No Handicrafts to continue",
        data: [],
        pagination: {
          page,
          pageSize,
          totalCount,
          lastPage: 1,
        },
      });
    }

    const data = await Promise.all(
      handicrafts.map(async (handicraft) => {
        const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
        const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const likes = await prisma.likes.count({ where: { id_handicraft: handicraft.id } });
        const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: handicraft.id } });
        const step_now = await prisma.history_handicraft.findMany({ where: { id_handicraft: handicraft.id, id_user: user[0].id } });

        const data = { ...handicraft, createdBy: user[0].name, image_user: user[0].image, step_now: step_now[0].step_number, waste: waste.map((waste) => waste.id_waste), tags: tags.map((tag) => tag.id_tag), likes, totalStep };
        const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
        data.waste = wasteName.map((waste) => waste.name);
        const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
        data.tags = tagsName.map((tag) => tag.name);

        return data;
      })
    );

    const lastPage = Math.ceil(totalCount / pageSize);

    res.status(200).json({
      message: "Successfully fetched Handicrafts to continue",
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error while fetching Handicrafts trending", error: error.message });
  }
};

// recently added
export const recentlyAdded = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const totalCount = await prisma.handicraft.count();
    const offset = (Number(page) - 1) * Number(pageSize);
    const handicrafts = await prisma.handicraft.findMany({
      orderBy: {
        createdAt: "desc",
      },
      take: Number(pageSize),
      skip: offset,
    });
    const data = await Promise.all(
      handicrafts.map(async (handicraft) => {
        const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
        const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const likes = await prisma.likes.count({ where: { id_handicraft: handicraft.id } });
        const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: handicraft.id } });

        const data = { ...handicraft, createdBy: user[0].name, image_user: user[0].image, waste: waste.map((waste) => waste.id_waste), tags: tags.map((tag) => tag.id_tag), likes, totalStep };
        const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
        data.waste = wasteName.map((waste) => waste.name);
        const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
        data.tags = tagsName.map((tag) => tag.name);

        return data;
      })
    );
    const lastPage = Math.ceil(totalCount / Number(pageSize));

    res.status(200).json({
      message: "Successfully fetched recently added Handicrafts",
      data,
      pagination: {
        page,
        pageSize,
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error while fetching Handicrafts trending", error: error.message });
  }
};
