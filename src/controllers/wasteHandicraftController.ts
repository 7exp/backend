import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const createWasteHandicraft = async (req: Request, res: Response) => {
  const { id_handicraft } = req.body;
  const { id_waste } = req.params;

  if (!id_waste || !id_handicraft) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }

  try {
    const newDetailWaste = await prisma.waste_handicraft.create({
      data: {
        id_handicraft,
        id_waste,
      },
    });
    res.status(201).json({ message: "DetailWaste created", data: newDetailWaste });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating detailWaste", data: error.message });
  }
};
