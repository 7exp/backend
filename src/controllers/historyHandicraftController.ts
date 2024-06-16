import { Request, Response } from "express";
import prisma from "../../prisma/client";

// create history handicraft
export const createHistoryHandicraft = async (req: Request, res: Response) => {
  const { id_handicraft, id_user, step_number } = req.body;

  if (!id_handicraft || !id_user || !step_number) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }

  const id_handicraftExists = await prisma.handicraft.findUnique({
    where: {
      id: id_handicraft,
    },
  });

  if (!id_handicraftExists) {
    return res.status(404).json({ message: "Handicraft not found", data: [] });
  }

  const id_userExists = await prisma.users.findUnique({
    where: {
      id: id_user,
    },
  });

  if (!id_userExists) {
    return res.status(404).json({ message: "User not found", data: [] });
  }

  // jika id handicraft dan id user sudah ada di history handicraft maka tidak bisa membuat history handicraft baru
  const historyHandicraftExists = await prisma.history_handicraft.findMany({
    where: {
      id_handicraft: id_handicraft,
      id_user: id_user,
    },
  });

  if (historyHandicraftExists.length > 0) {
    return res.status(400).json({ message: "History Handicraft already exists", data: [] });
  }

  try {
    const newHistoryHandicraft = await prisma.history_handicraft.create({
      data: {
        id_handicraft,
        id_user,
        step_number,
      },
    });
    res.status(201).json({ message: "Successfully created historyHandicraft", data: newHistoryHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating historyHandicraft", data: error.message });
  }
};

export const getHistoryHandicraft = async (req: Request, res: Response) => {
  try {
    const { idUser } = req.params;
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(pageSize);

    const totalCount = await prisma.history_handicraft.count({
      where: {
        id_user: idUser,
      },
    });

    const historyHandicraft = await prisma.history_handicraft.findMany({
      where: {
        id_user: idUser,
      },
      orderBy: {
        updatedAt: "desc",
      },
      take: Number(pageSize),
      skip: offset,
    });

    if (!historyHandicraft) {
      return res.status(404).json({ message: "History Handicraft not found", data: [] });
    }

    const handicrafts = await prisma.handicraft.findMany({
      where: {
        history_handicraft: {
          some: {
            id_user: idUser,
          },
        },
      },
    });

    const data = await Promise.all(
      handicrafts.map(async (handicraft) => {
        const user = await prisma.users.findUnique({ where: { id: handicraft.id_user } });
        const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const likes = await prisma.likes.count({ where: { id_handicraft: handicraft.id } });
        const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: handicraft.id } });

        const data = {
          ...handicraft,
          createdBy: user?.name,
          image_user: user?.image,
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

    const lastPage = Math.ceil(totalCount / Number(pageSize));

    res.status(200).json({
      message: "Getting History Handicrafts successfully",
      data,
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting history handicraft", data: error.message });
  }
};

// get all history handicraft
// Get all history handicraft with pagination
export const getAllHistoryHandicraft = async (req: Request, res: Response) => {
  try {
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(pageSize);

    // Count total history handicrafts
    const totalCount = await prisma.history_handicraft.count();

    // Query history handicrafts with pagination
    const historyHandicrafts = await prisma.history_handicraft.findMany({
      orderBy: {
        updatedAt: "desc",
      },
      take: Number(pageSize),
      skip: offset,
    });

    const lastPage = Math.ceil(totalCount / Number(pageSize));

    res.status(200).json({
      message: "Getting History Handicrafts successfully",
      data: historyHandicrafts,
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting history handicraft", data: error.message });
  }
};

// edit history handicraft
export const editHistoryHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { done } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  const historyHandicraft = await prisma.history_handicraft.findUnique({
    where: { id },
  });

  if (!historyHandicraft) {
    return res.status(404).json({ message: "History Handicraft not found", data: [] });
  }

  try {
    const updatedHistoryHandicraft = await prisma.history_handicraft.update({
      where: { id },
      data: {
        done,
      },
    });

    res.status(200).json({ message: "Successfully updated History Handicraft", data: updatedHistoryHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating history handicraft", data: error.message });
  }
};

// delete history handicraft
export const deleteHistoryHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.history_handicraft.delete({
      where: { id },
    });

    res.status(200).json({ message: "Successfully deleted History Handicraft", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting history handicraft", data: error.message });
  }
};

// delete all history handicraft where user id is logged in
export const deleteAllHistoryHandicraft = async (req: Request, res: Response) => {
  const { id_user } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "User Id is required", data: [] });
  }

  try {
    await prisma.history_handicraft.deleteMany({
      where: { id_user },
    });

    res.status(200).json({ message: "Successfully deleted all History Handicraft", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting all history handicraft", data: error.message });
  }
};
