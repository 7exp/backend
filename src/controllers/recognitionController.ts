import { Request, Response } from "express";
import prisma from "../../prisma/client";

// recognition input aray wastename
export const recognition = async (req: Request, res: Response) => {
  const { wastename } = req.body;

  if (!wastename) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }

  try {
    const waste = await prisma.waste.findMany({
      where: {
        name: wastename,
      },
    });

    if (!waste) {
      return res.status(404).json({ message: "Waste not found" });
    }

    res.status(200).json({ message: "Successfully get recognition", data: waste });
  } catch (error: any) {
    res.status(500).json({ message: "Error get recognition", data: error.message });
  }
};
