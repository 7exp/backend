import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

// create handicraft without image
export const createHandicraft = async (req: Request, res: Response) => {
  const { name, description, id_user, waste, tags } = req.body;

  let id_handicraft = "";

  // tag is array of string, add 1 by 1 in table tag
  for (let i = 0; i < tags.length; i++) {
    // if tag already exist, skip
    const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
    if (tag) continue;
    await prisma.tag.create({
      data: {
        name: tags[i],
      },
    });
  }

  if (!name || !description || !id_user || !waste || !tags) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }

  try {
    const newHandicraft = await prisma.handicraft.create({
      data: {
        name,
        description,
        id_user,
      },
    });

    id_handicraft = newHandicraft.id;

    for (let i = 0; i < waste.length; i++) {
      const wastename = await prisma.waste.findMany({ where: { name: waste[i] } });
      if (wastename) {
        await prisma.waste_handicraft.create({
          data: {
            id_handicraft: id_handicraft,
            id_waste: wastename[0].id,
          },
        });
      }
    }

    for (let i = 0; i < tags.length; i++) {
      const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
      if (tag) {
        await prisma.tag_handicraft.create({
          data: {
            id_handicraft: id_handicraft,
            id_tag: tag.id,
          },
        });
      }
    }

    const payload = {
      id: id_handicraft,
      name: name,
      description: description,
      id_user: id_user,
      waste: waste,
      tags: tags,
    };

    res.status(201).json({ message: "Successfully created Handicraft", data: payload });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating handicraft", data: error.message });
  }
};

// Update Handicraft
export const updateHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, id_user, waste = [], tags = [] } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  // check if handicraft exists
  const handicraft = await prisma.handicraft.findUnique({ where: { id } });
  if (!handicraft) {
    return res.status(404).json({ message: "Handicraft not found", data: [] });
  }

  try {
    // Only update fields if they are provided
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (id_user) updateData.id_user = id_user;

    await prisma.handicraft.update({
      where: { id },
      data: updateData,
    });

    // Update waste and tags only if they are provided
    if (waste.length > 0) {
      await prisma.waste_handicraft.deleteMany({
        where: { id_handicraft: id },
      });

      for (let i = 0; i < waste.length; i++) {
        const wastename = await prisma.waste.findMany({ where: { name: waste[i] } });
        if (wastename) {
          await prisma.waste_handicraft.create({
            data: {
              id_handicraft: id,
              id_waste: wastename[0].id,
            },
          });
        }
      }
    }

    if (tags.length > 0) {
      await prisma.tag_handicraft.deleteMany({
        where: { id_handicraft: id },
      });

      for (let i = 0; i < tags.length; i++) {
        const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
        if (tag) {
          await prisma.tag_handicraft.create({
            data: {
              id_handicraft: id,
              id_tag: tag.id,
            },
          });
        }
      }
    }

    const getHandicraftById = await prisma.handicraft.findUnique({
      where: { id },
      include: {
        waste_handicraft: {
          select: {
            id_waste: true,
            waste: {
              select: {
                name: true,
              },
            },
          },
        },
        tag_handicraft: {
          select: {
            id_tag: true,
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
        _count: {
          select: {
            likes: true,
            detail_handicraft: true,
          },
        },
      },
    });

    const payload = {
      id: getHandicraftById?.id,
      name: getHandicraftById?.name,
      description: getHandicraftById?.description,
      image: getHandicraftById?.image,
      id_user: getHandicraftById?.id_user,
      waste: getHandicraftById?.waste_handicraft.map((waste) => waste.waste.name),
      tags: getHandicraftById?.tag_handicraft.map((tag) => tag.tag.name),
      likes: getHandicraftById?._count.likes,
      totalStep: getHandicraftById?._count.detail_handicraft,
    };

    res.status(200).json({ message: "Successfully updated Handicraft", data: payload });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating handicraft", data: error.message });
  }
};

// Get All Handicrafts
export const getAllHandicrafts = async (req: Request, res: Response) => {
  try {
    const handicrafts = await prisma.handicraft.findMany();
    const data = await Promise.all(
      handicrafts.map(async (handicraft) => {
        const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
        const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: handicraft.id } });
        // count total images user have uploaded for each handicraft
        const totalImages = await prisma.handicraft.count({ where: { id_user: handicraft.id_user } });

        const likes = await prisma.likes.count({ where: { id_handicraft: handicraft.id } });
        const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: handicraft.id } });

        const data = { ...handicraft, createdBy: user[0].name, totalImages, waste: waste.map((waste) => waste.id_waste), tags: tags.map((tag) => tag.id_tag), likes, totalStep };
        const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
        data.waste = wasteName.map((waste) => waste.name);
        const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
        data.tags = tagsName.map((tag) => tag.name);

        return data;
      })
    );

    res.status(200).json({ message: "Successfully fetched Handicrafts", data: data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching handicrafts", data: error });
  }
};

// Get Handicraft by ID
export const getHandicraftById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const handicraft = await prisma.handicraft.findUnique({
      where: { id },
    });

    if (!handicraft) {
      return res.status(404).json({ message: "Handicraft not found", data: [] });
    }

    const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
    const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: id } });
    const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: id } });
    const likes = await prisma.likes.count({ where: { id_handicraft: id } });
    const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: id } });

    const data = { ...handicraft, createdBy: user[0].name, image_user: user[0].image, waste: waste.map((waste) => waste.id_waste), tags: tags.map((tag) => tag.id_tag), likes, totalStep };
    const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
    data.waste = wasteName.map((waste) => waste.name);
    const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
    data.tags = tagsName.map((tag) => tag.name);

    res.status(200).json({ message: "Successfully fetched Handicraft", data: data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching handicraft", data: error });
  }
};

// Delete Handicraft also delete image from GCS and delete waste_handicraft and tag_handicraft
export const deleteHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const handicraft = await prisma.handicraft.findUnique({ where: { id: id } });

    if (!handicraft) {
      return res.status(404).json({ message: "Handicraft not found", data: [] });
    }

    const image = handicraft.image;
    if (image) {
      const fileName = image.split("/").pop();
      const filePath = `handicraft/${fileName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
    }

    await prisma.history_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.waste_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.tag_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.likes.deleteMany({ where: { id_handicraft: id } });
    await prisma.detail_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.handicraft.delete({ where: { id: id } });

    res.status(200).json({ message: `Successfully deleted Handicraft with id ${id}`, data: [] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting handicraft", data: error });
  }
};

// search handicraft by any field
export const searchHandicraft = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    let handicrafts: any[] = [];
    if (query) {
      handicrafts = await prisma.handicraft.findMany({
        where: {
          OR: [{ name: { contains: query as string } }, { description: { contains: query as string } }],
        },
      });
      // query search on waste and tags and add to handicrafts
      const waste = await prisma.waste.findMany({ where: { name: { contains: query as string } } });
      const tag = await prisma.tag.findMany({ where: { name: { contains: query as string } } });
      const wasteHandicraft = await prisma.waste_handicraft.findMany({ where: { id_waste: { in: waste.map((waste) => waste.id) } } });
      const tagHandicraft = await prisma.tag_handicraft.findMany({ where: { id_tag: { in: tag.map((tag) => tag.id) } } });
      const handicraftsWaste = await prisma.handicraft.findMany({ where: { id: { in: wasteHandicraft.map((waste) => waste.id_handicraft) } } });
      const handicraftsTag = await prisma.handicraft.findMany({ where: { id: { in: tagHandicraft.map((tag) => tag.id_handicraft) } } });
      handicrafts = [...handicrafts, ...handicraftsWaste, ...handicraftsTag];

      handicrafts = await Promise.all(
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

          if (handicrafts.length < 20) handicrafts.push(data);
          return data;
        })
      );
    }

    if (handicrafts.length === 0) {
      return res.status(404).json({ message: "No Handicraft Found", data: [] });
    }

    // remove duplicate handicrafts id
    handicrafts = handicrafts.filter((v, i, a) => a.findIndex((t) => t.id === v.id) === i);

    res.status(200).json({ message: "Successfully Fetched Handicraft", data: handicrafts });
  } catch (error) {
    res.status(500).json({ message: "Error fetching handicrafts", data: error });
  }
};
