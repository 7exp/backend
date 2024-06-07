import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { config } from "../config";
// import uuidv4
import { v4 as uuidv4 } from "uuid";

import { uploadFileGCS, deleteFileGCS } from "../utils/bucketImage";

export const updateWaste = async (req: Request, res: Response) => {
  const { id } = req.params;

  const file = req.file;
  const { name } = req.body; // Mengambil data input lain

  const filename = file?.originalname;
  const fileOutputName = `${uuidv4()}-${filename}`;
  const bucketName = config.bucketName as string;

  // console.log("Received file:", file); // Log the file object

  if (!file) {
    return res.status(400).json({ error: "File is required" });
  }

  try {
    // Upload file to Google Cloud Storage
    await uploadFileGCS(bucketName, file as any, fileOutputName, "waste");
    const public_url = `https://storage.googleapis.com/${bucketName}/waste/${fileOutputName}`;

    if (!id) {
      return res.status(400).json({ error: "ID is required" });
    }

    // Update database record with the new image URL
    const updatedWaste = await prisma.waste.update({
      where: { id: id },
      data: {
        image: public_url,
        name: name, // Update nama juga
      },
    });

    res.status(200).json({ message: `Waste ${id} updated`, data: updatedWaste });
  } catch (error) {
    // console.error("Error uploading file or updating database:", error);
    return res.status(500).json({ error: "Error uploading file or updating database" });
  }
};

// Create Waste
export const createWaste = async (req: Request, res: Response) => {
  const file = req.file as Express.Multer.File;
  const { name } = req.body; // Mengambil data input lain

  const filename = file?.originalname;
  const fileOutputName = `${uuidv4()}-${filename}`;
  const bucketName = config.bucketName as string;

  // console.log("Received file:", file); // Log the file object

  if (!file) {
    return res.status(400).json({ error: "File is required" });
  }

  try {
    // Upload file to Google Cloud Storage
    await uploadFileGCS(bucketName, file as any, fileOutputName, "waste");
    const public_url = `https://storage.googleapis.com/${bucketName}/waste/${fileOutputName}`;

    // Create new waste record in the database
    const newWaste = await prisma.waste.create({
      data: {
        image: public_url,
        name: name,
      },
    });

    res.status(201).json({ message: "Waste created", data: newWaste });
  } catch (error) {
    // console.error("Error uploading file or creating database record:", error);

    // If there's an error after the file upload, delete the file from GCS
    const filePath = `waste/${fileOutputName}`;
    try {
      await deleteFileGCS(bucketName, filePath);
      console.log("Rolled back file upload");
    } catch (rollbackError) {
      console.error("Error rolling back file upload:", rollbackError);
    }

    return res.status(500).json({ error: "Error uploading file or creating database record" });
  }
};

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

// Delete Waste
export const deleteWaste = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    // Cari data waste berdasarkan ID
    const waste = await prisma.waste.findUnique({ where: { id: id } });

    if (!waste) {
      return res.status(404).json({ error: "Waste not found" });
    }

    // Ambil URL gambar dari waste
    const imageUrl = waste.image;

    // Extract the file path from the URL (assuming the file path starts after the bucket name)
    const filePath = imageUrl.split(`https://storage.googleapis.com/${config.bucketName}/`)[1];

    // Hapus file dari Google Cloud Storage
    await deleteFileGCS(config.bucketName as string, filePath);

    // Hapus data waste dari database
    await prisma.waste.delete({ where: { id: id } });

    res.status(200).json({ message: `Waste ${id} deleted successfully` });
  } catch (error) {
    console.error("Error deleting waste:", error);
    return res.status(500).json({ error: "Error deleting waste" });
  }
};
