import { Request, Response } from "express";
import prisma from "../../prisma/client";

// create detailHandicraft
export const createDetailHandicraft = async (req: Request, res: Response) => {
  const { name, description, step_number } = req.body;
  const { id_handicraft } = req.params;

  if (!id_handicraft || !description || !step_number) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const id_handicraftExists = await prisma.handicraft.findUnique({
    where: {
      id: id_handicraft,
    },
  });

  if (!id_handicraftExists) {
    return res.status(404).json({ error: "Handicraft not found" });
  }

  const step_numberExists = await prisma.detail_handicraft.findMany({
    where: {
      id_handicraft: id_handicraft,
      step_number: step_number,
    },
  });

  if (step_numberExists.length > 0) {
    return res.status(400).json({ error: "Step number " + step_number + " already exists" });
  }

  try {
    const newDetailHandicraft = await prisma.detail_handicraft.create({
      data: {
        id_handicraft,
        name,
        description,
        step_number,
      },
    });
    res.status(201).json({ message: "Successfully created detailHandicraft", data: newDetailHandicraft });
  } catch (error: any) {
    res.status(500).json({ error: "Error creating detailHandicraft", message: error.message });
  }
};

// get one detailHandicraft
export const getDetailHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const detailHandicraft = await prisma.detail_handicraft.findUnique({
      where: {
        id: id,
      },
    });

    if (!detailHandicraft) {
      return res.status(404).json({ error: "DetailHandicraft not found" });
    }

    res.status(200).json({ message: "DetailHandicraft found", data: detailHandicraft });
  } catch (error) {
    res.status(500).json({ error: "Error fetching detailHandicraft" });
  }
};

//  edit detailHandicraft

export const editDetailHandicraft = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { id } = req.params;

  if (!name || !description) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedDetailHandicraft = await prisma.detail_handicraft.update({
      where: {
        id: id,
      },
      data: {
        name,
        description,
      },
    });

    res.status(200).json({ message: "Successfully updated detailHandicraft", data: updatedDetailHandicraft });
  } catch (error: any) {
    res.status(500).json({ error: "Error updating detailHandicraft", message: error.message });
  }
};

// delete detailHandicraft
export const deleteDetailHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.detail_handicraft.delete({
      where: {
        id: id,
      },
    });

    res.status(200).json({ message: `DetailHandicraft with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting detailHandicraft" });
  }
};
