import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Get All Waste
export const getAllWastes = async (req: Request, res: Response) => {
  try {
    const wastes = await prisma.waste.findMany();
    res.status(200).json({ data: wastes });
  } catch (error) {
    res.status(500).json({ error: "Error fetching wastes" });
  }
};

// Get Waste by ID
export const getWasteById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const waste = await prisma.waste.findUnique({
      where: { id: id },
    });
    res.status(200).json({ data: waste });
  } catch (error) {
    res.status(500).json({ error: "Error fetching waste" });
  }
};
