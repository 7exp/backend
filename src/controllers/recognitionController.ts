import { Request, Response } from "express";
import prisma from "../../prisma/client";
import axios from "axios";
import { config } from "../config";
import path from "path";
import fs from "fs";
import FormData from "form-data";


// save upload axios post ke url config.BASE_URL_BACKEND_ML
export const recognition = async (req: Request, res: Response) => {
  const image = req.file as Express.Multer.File;

  if (!image) {
    return res.status(400).json({ message: "Image is required", data: [] });
  }

  const fileExtension = image.originalname.split(".").pop()?.toLowerCase();
  const allowedExtensions = ["png", "jpg", "jpeg"];
  if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
    return res.status(400).json({ message: "Invalid file type! Only PNG, JPG, and JPEG are allowed.", data: [] });
  }

  try {
    // Create FormData object
    const formData = new FormData();
    formData.append("image", image.buffer, {
      filename: image.originalname,
      contentType: image.mimetype,
    });

    // Send POST request using Axios without explicitly setting headers
    const response = await axios.post(`${config.backendMlUrl}/predict` as string, formData, {
      headers: {
        ...formData.getHeaders(),
      },
    });

    // Assuming the response contains detections array
    const { detections } = response.data;

    // Log detections to console
    // Log detections to console
    const sampah = detections.map((detection: any, index: number) => detection.object);

    console.log("Detected objects:", sampah);

    // gunakan sampah untuk mencari karya kerajinan yang terkait
    const handicrafts = await prisma.handicraft.findMany({
      where: {
        waste_handicraft: {
          some: {
            waste: {
              label: {
                in: sampah,
              },
            },
          },
        },
      },
      include: {
        users: true,
        tag_handicraft: {
          include: {
            tag: true,
          },
        },
        waste_handicraft: {
          include: {
            waste: true,
          },
        },
        likes: true,
      },
    });

    const result = handicrafts.map((handicraft) => ({
      id: handicraft.id,
      name: handicraft.name,
      description: handicraft.description,
      image: handicraft.image,
      user: {
        id: handicraft.users.id,
        name: handicraft.users.name,
        email: handicraft.users.email,
        role: handicraft.users.role,
        image: handicraft.users.image,
      },
      tags: handicraft.tag_handicraft.map((tagHandicraft) => ({
        name: tagHandicraft.tag.name,
      })),
      wastes: handicraft.waste_handicraft.map((wasteHandicraft) => ({
        name: wasteHandicraft.waste.name,
      })),
      likesCount: handicraft.likes.length,
    }));

    // Kirim respons dengan data karya kerajinan yang ditemukan
    res.status(200).json({ message: "Image uploaded successfully", data: result });
  } catch (error: any) {
    return res.status(500).json({ message: "Error uploading image", data: error.message });
  }
};