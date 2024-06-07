import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { uploadFileGCS, deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

// image upload for handicraft
export const updateImageHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = req.file as Express.Multer.File;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const imageExist = await prisma.handicraft.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });

  if (!imageExist) {
    return res.status(404).json({ error: "Handicraft not found" });
  }

  const filename = image?.originalname;
  const fileOutputName = `${uuidv4()}-${filename}`;

  try {
    // Upload new image to GCS
    await uploadFileGCS(config.bucketName as string, image, fileOutputName, "handicraft");
    const public_url = `https://storage.googleapis.com/${config.bucketName}/handicraft/${fileOutputName}`;

    // Update the database with the new image URL
    const updatedHandicraft = await prisma.handicraft.update({
      where: { id },
      data: {
        image: public_url,
      },
    });

    // Attempt to delete old image from GCS
    if (imageExist.image) {
      const oldFileName = imageExist.image.split("/").pop();
      const oldFilePath = `handicraft/${oldFileName}`;
      try {
        await deleteFileGCS(config.bucketName as string, oldFilePath);
      } catch (deleteError: any) {
        // Log error but do not fail the update process
        console.error("Error deleting old image from GCS:", deleteError.message);
      }
    }

    res.status(200).json({ message: "Successfully updated Handicraft image", data: updatedHandicraft });
  } catch (error: any) {
    // Handle any error during file upload or database update
    try {
      // If there's an error after the file upload, delete the new file from GCS
      const filePath = `handicraft/${fileOutputName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
      console.log("Rolled back file upload");
    } catch (rollbackError: any) {
      console.error("Error rolling back file upload:", rollbackError.message);
    }
    res.status(500).json({ error: "Error updating handicraft image", message: error.message });
  }
};

// image upload for detail handicraft
export const updateImageDetailHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = req.file as Express.Multer.File;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const imageExist = await prisma.detail_handicraft.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });

  if (!imageExist) {
    return res.status(404).json({ error: "Detail Handicraft not found" });
  }

  const filename = image?.originalname;
  const fileOutputName = `${uuidv4()}-${filename}`;

  try {
    // Upload new image to GCS
    await uploadFileGCS(config.bucketName as string, image, fileOutputName, "detail-handicraft");
    const public_url = `https://storage.googleapis.com/${config.bucketName}/detail_handi/${fileOutputName}`;

    // Update the database with the new image URL
    const updatedDetailHandicraft = await prisma.detail_handicraft.update({
      where: { id },
      data: {
        image: public_url,
      },
    });

    // Attempt to delete old image from GCS
    if (imageExist.image) {
      const oldFileName = imageExist.image.split("/").pop();
      const oldFilePath = `detail_handi/${oldFileName}`;
      try {
        await deleteFileGCS(config.bucketName as string, oldFilePath);
      } catch (deleteError: any) {
        // Log error but do not fail the update process
        console.error("Error deleting old image from GCS:", deleteError.message);
      }
    }

    res.status(200).json({ message: "Successfully updated Detail Handicraft image", data: updatedDetailHandicraft });
  } catch (error: any) {
    // Handle any error during file upload or database update
    try {
      // If there's an error after the file upload, delete the new file from GCS
      const filePath = `detail_handi/${fileOutputName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
      console.log("Rolled back file upload");
    } catch (rollbackError: any) {
      console.error("Error rolling back file upload:", rollbackError.message);
    }
    res.status(500).json({ error: "Error updating detail handicraft image", message: error.message });
  }
};

// image upload for user
export const updateImageUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = req.file as Express.Multer.File;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  const imageExist = await prisma.users.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });

  if (!imageExist) {
    return res.status(404).json({ error: "User not found" });
  }

  const filename = image?.originalname;
  const fileOutputName = `${uuidv4()}-${filename}`;

  try {
    // Upload new image to GCS
    await uploadFileGCS(config.bucketName as string, image, fileOutputName, "user");
    const public_url = `https://storage.googleapis.com/${config.bucketName}/user/${fileOutputName}`;

    // Update the database with the new image URL
    const updatedUser = await prisma.users.update({
      where: { id },
      data: {
        image: public_url,
      },
    });

    // Attempt to delete old image from GCS
    if (imageExist.image) {
      const oldFileName = imageExist.image.split("/").pop();
      const oldFilePath = `user/${oldFileName}`;
      try {
        await deleteFileGCS(config.bucketName as string, oldFilePath);
      } catch (deleteError: any) {
        // Log error but do not fail the update process
        console.error("Error deleting old image from GCS:", deleteError.message);
      }
    }

    res.status(200).json({ message: "Successfully updated User image", data: updatedUser });
  } catch (error: any) {
    // Handle any error during file upload or database update
    try {
      // If there's an error after the file upload, delete the new file from GCS
      const filePath = `user/${fileOutputName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
      console.log("Rolled back file upload");
    } catch (rollbackError: any) {
      console.error("Error rolling back file upload:", rollbackError.message);
    }
    res.status(500).json({ error: "Error updating user image", message: error.message });
  }
};
