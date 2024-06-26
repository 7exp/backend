import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { uploadFileGCS, deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

// image upload for handicraft
export const updateImageHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = req.file as Express.Multer.File;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  const imageExist = await prisma.handicraft.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });

  if (!imageExist) {
    return res.status(404).json({ message: "Handicraft not found", data: [] });
  }

  // use id as file name
  const fileExtension = image.originalname.split(".").pop()?.toLowerCase();
  if (!fileExtension || !ALLOWED_EXTENSIONS.includes(`.${fileExtension}`)) {
    return res.status(400).json({ message: "Invalid file type! Only PNG, JPG, and JPEG are allowed.", data: [] });
  }

  // Construct the file output name using the id and the file extension
  const fileOutputName = `${id}.${fileExtension}`;

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

    res.status(200).json({ message: "Successfully updated Handicraft image", data: payload });
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
    res.status(500).json({ message: "Error updating handicraft image", data: error.message });
  }
};

// image upload for detail handicraft
export const updateImageDetailHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = req.file as Express.Multer.File;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  const imageExist = await prisma.detail_handicraft.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });

  if (!imageExist) {
    return res.status(404).json({ message: "Detail Handicraft not found", data: [] });
  }

  // use id as file name
  const fileExtension = image.originalname.split(".").pop()?.toLowerCase();
  if (!fileExtension || !ALLOWED_EXTENSIONS.includes(`.${fileExtension}`)) {
    return res.status(400).json({ message: "Invalid file type! Only PNG, JPG, and JPEG are allowed.", data: [] });
  }

  // Construct the file output name using the id and the file extension
  const fileOutputName = `${id}.${fileExtension}`;

  try {
    // Upload new image to GCS
    await uploadFileGCS(config.bucketName as string, image, fileOutputName, "detail-handicraft");
    const public_url = `https://storage.googleapis.com/${config.bucketName}/detail_handicraft/${fileOutputName}`;

    // Update the database with the new image URL
    const updatedDetailHandicraft = await prisma.detail_handicraft.update({
      where: { id },
      data: {
        image: public_url,
      },
    });

    res.status(200).json({ message: "Successfully updated Detail Handicraft image", data: updatedDetailHandicraft });
  } catch (error: any) {
    // Handle any error during file upload or database update
    try {
      // If there's an error after the file upload, delete the new file from GCS
      const filePath = `detail_handicraft/${fileOutputName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
      console.log("Rolled back file upload");
    } catch (rollbackError: any) {
      console.error("Error rolling back file upload:", rollbackError.message);
    }
    res.status(500).json({ message: "Error updating detail handicraft image", data: error.message });
  }
};

// image upload for user
export const updateImageUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const image = req.file as Express.Multer.File;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  const imageExist = await prisma.users.findUnique({
    where: { id },
    select: {
      image: true,
    },
  });

  if (!imageExist) {
    return res.status(404).json({ message: "User not found", data: [] });
  }

  // use id as file name
  const fileExtension = image.originalname.split(".").pop()?.toLowerCase();
  if (!fileExtension || !ALLOWED_EXTENSIONS.includes(`.${fileExtension}`)) {
    return res.status(400).json({ message: "Invalid file type! Only PNG, JPG, and JPEG are allowed.", data: [] });
  }

  // Construct the file output name using the id and the file extension
  const fileOutputName = `${id}.${fileExtension}`;

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

    res.status(200).json({ message: "Successfully updated User image",
      data: {
        id: updatedUser.id,
        name: updatedUser.name,
        email: updatedUser.email,
        image: updatedUser.image,
      }
    });
  } catch (error: any) {
    // Handle any error during file upload or database update
    try {
      // If there's an error after the file upload, delete the new file from GCS
      const filePath = `user/${fileOutputName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
    } catch (rollbackError: any) {
      res.status(500).json({ message: "Error deleting image", data: rollbackError.message });
    }
    res.status(500).json({ message: "Error updating user image", data: error.message });
  }
};
