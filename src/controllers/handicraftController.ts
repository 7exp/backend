import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Create Handicraft
export const createHandicraft = async (req: Request, res: Response) => {
  const { name, description, image, id_user, tags } = req.body;

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
    console.log("tag created");
  }

  try {
    const newHandicraft = await prisma.handicraft.create({
      data: {
        name,
        description,
        image,
        id_user,
      },
    });

    id_handicraft = newHandicraft.id;

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
      image: image,
      id_user: id_user,
      tags: tags,
    }

    res.status(201).json({ message: "Successfully created Handicraft", data: payload });
  } catch (error: any) {
    res.status(500).json({ error: "Error creating handicraft", message: error.message });
  }
};

// Get All Handicrafts
export const getAllHandicrafts = async (req: Request, res: Response) => {
  try {
    const handicrafts = await prisma.handicraft.findMany();
    res.status(200).json({ data: handicrafts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching handicrafts" });
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
      return res.status(404).json({ error: "Handicraft not found" });
    }

    const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
    const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: id } });
    
    const data = { ...handicraft, username : user[0].name, tags: tags.map((tag) => tag.id_tag) };
    const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
    data.tags = tagsName.map((tag) => tag.name);
    
    res.status(200).json({ "message": "Successfully fetched Handicraft", data: data });
  } catch (error) {
    res.status(500).json({ error: "Error fetching handicraft" });
  }
};

// Update Handicraft
export const updateHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, image, id_category, id_user } = req.body;

  try {
    const updatedHandicraft = await prisma.handicraft.update({
      where: { id },
      data: {
        name,
        description,
        image,
        id_user,
      },
    });

    res.status(200).json({ data: updatedHandicraft, message: "Handicraft updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating handicraft" });
  }
};

// Delete Handicraft
export const deleteHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.handicraft.delete({
      where: { id },
    });

    res.status(200).json({ message: "Handicraft deleted" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting handicraft" });
  }
};
