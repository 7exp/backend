import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

export const deleteImageHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idHandicraftExists = await prisma.handicraft.findUnique({
    where: {
      id: id,
    },
  });

  if (!idHandicraftExists) {
    return res.status(404).json({ message: "Handicraft not found", data: [] });
  }

  const image = idHandicraftExists.image;

  try {
    // delete image from database
    await prisma.handicraft.update({
      where: { id: id },
      data: { image: "" },
    });

    if (image) {
      const fileName = image.split("/").pop();
      const filePath = `handicraft/${fileName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
    }

    res.status(200).json({ message: "Successfully deleted image", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting image", data: error.message });
  }
};

export const deleteImageDetailHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idDetailHandicraftExists = await prisma.detail_handicraft.findUnique({
    where: {
      id: id,
    },
  });

  if (!idDetailHandicraftExists) {
    return res.status(404).json({ message: "Detail Handicraft not found", data: [] });
  }

  const image = idDetailHandicraftExists.image;

  try {
    await prisma.detail_handicraft.update({
      where: { id: id },
      data: { image: "" },
    });

    if (image) {
      const fileName = image.split("/").pop();
      const filePath = `detail-handicraft/${fileName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
    }
    res.status(200).json({ message: "Successfully deleted image", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting image", data: error.message });
  }
};

export const deleteImageUser = async (req: Request, res: Response) => {
  const { id } = req.params;

  const idUserExists = await prisma.users.findUnique({
    where: {
      id: id,
    },
  });

  if (!idUserExists) {
    return res.status(404).json({ message: "User not found", data: [] });
  }

  const image = idUserExists.image;

  try {
    await prisma.users.update({
      where: { id: id },
      data: { image: config.DefaultImage },
    });

    if (image) {
      const fileName = image.split("/").pop() || "";
      const filePath = `user/${fileName}`;

      // Cek apakah filePath adalah default.png
      if (filePath !== "user/default.png") {
        await deleteFileGCS(config.bucketName as string, filePath);
      }
    }
    res.status(200).json({ message: "Successfully deleted image", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting image", data: error.message });
  }
};
