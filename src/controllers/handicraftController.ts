import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Create Handicraft
export const createHandicraft = async (req: Request, res: Response) => {
  const { name, description, image, id_category, id_user } = req.body;

  try {
    const newHandicraft = await prisma.handicraft.create({
      data: {
        name,
        description,
        image,
        id_category,
        id_user,
      },
    });
    res.status(201).json({ message: "Handicraft created", data: newHandicraft });
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

    res.status(200).json({ data: handicraft });
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
        id_category,
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
