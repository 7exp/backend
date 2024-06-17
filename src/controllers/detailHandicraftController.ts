import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

// create detailHandicraft
export const createDetailHandicraft = async (req: Request, res: Response) => {
  const { name, description, step_number } = req.body;
  const { id_handicraft } = req.params;

  if (!id_handicraft || !description || !step_number) {
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

  const step_numberExists = await prisma.detail_handicraft.findMany({
    where: {
      id_handicraft: id_handicraft,
      step_number: step_number,
    },
  });

  if (step_numberExists.length > 0) {
    return res.status(400).json({ message: "Step number " + step_number + " already exists", data: [] });
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
    res.status(500).json({ message: "Error creating detailHandicraft", data: error.message });
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
      return res.status(404).json({ message: "DetailHandicraft not found", data: [] });
    }

    res.status(200).json({ message: "Successfully fetched detailHandicraft with id " + id, data: detailHandicraft });
  } catch (error) {
    res.status(500).json({ message: "Error fetching detailHandicraft", data: error });
  }
};

//  edit detailHandicraft

export const editDetailHandicraft = async (req: Request, res: Response) => {
  const { name, description } = req.body;
  const { id } = req.params;

  if (!name || !description) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }
  
  // check if detailHandicraft exists
  const detailHandicraftExists = await prisma.detail_handicraft.findUnique({
    where: {
      id: id,
    },
  });

  if (!detailHandicraftExists) {
    return res.status(404).json({ message: "DetailHandicraft not found", data: [] });
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

    res.status(200).json({ message: "Successfully updated detailHandicraft from UserId " + id, data: updatedDetailHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating detailHandicraft", data: error.message });
  }
};

// delete detailHandicraft
export const deleteDetailHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const detail_handicraft = await prisma.detail_handicraft.delete({
      where: {
        id: id,
      },
    });

    // delete image from GCS
    const image = detail_handicraft.image;
    if (image) {
      const fileName = image.split("/").pop();
      const filePath = `detail-handicraft/${fileName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
    }
    res.status(200).json({ message: `Successfully deleted detailHandicraft with id ${id}`, data: [] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting detailHandicraft", data: error });
  }
};
