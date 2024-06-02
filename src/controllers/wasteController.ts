import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { config } from "../config";

const { Storage } = require("@google-cloud/storage");

const storageGCS = new Storage({
  projectId: config.projectId,
  keyFilename: config.keyFilename,
});

const uploadFileGCS = async (bucketName: string, file: Express.Multer.File, fileOutputName: string) => {
  try {
    // Get a reference to the specified bucket
    const bucket = storageGCS.bucket(bucketName);

    // Create a writable stream to upload the file
    const fileUploadStream = bucket.file(`waste/${fileOutputName}`).createWriteStream({
      metadata: {
        contentType: file.mimetype,
      },
    });

    // Write the buffer to the stream
    fileUploadStream.end(file.buffer);

    // Wait for the stream to finish
    await new Promise((resolve, reject) => {
      fileUploadStream.on("finish", resolve);
      fileUploadStream.on("error", reject);
    });

    // Return a successful result
    return { success: true };
  } catch (error) {
    // Handle any errors that occur during the upload process
    console.error("Error:", error);
    throw error;
  }
};

export const updateWaste = async (req: Request, res: Response) => {
  const { id } = req.params;

  const file = req.file;
  const { name } = req.body; // Mengambil data input lain

  const filename = file?.originalname;
  const fileOutputName = `${id}-${filename}`;
  const bucketName = config.bucketName as string;

  console.log("Received file:", file); // Log the file object

  if (!file) {
    return res.status(400).json({ error: "File is required" });
  }

  try {
    // Upload file to Google Cloud Storage
    await uploadFileGCS(bucketName, file as any, fileOutputName);
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
    console.error("Error uploading file or updating database:", error);
    return res.status(500).json({ error: "Error uploading file or updating database" });
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

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    await prisma.waste.delete({
      where: { id: id },
    });

    res.status(200).json({ message: `Waste ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting waste" });
  }
};
