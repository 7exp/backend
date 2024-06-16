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
    
    const { detections } = response.data;
    
    const sampah = detections.map((detection: any) => detection.object);
    if (sampah.length === 0) {
      return res.status(404).json({ message: "Image detected successfully but don't matches any waste", data: [] });
    }

    // Pagination parameters
    const { page = 1, pageSize = 10 } = req.query;
    const offset = (Number(page) - 1) * Number(pageSize);

    // Count total matching handicrafts
    const totalCount = await prisma.handicraft.count({
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
    });

    // Query handicrafts with pagination
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
        detail_handicraft: true,
      },
      take: Number(pageSize),
      skip: offset,
    });


    const result = handicrafts.map((handicraft) => ({
      id: handicraft.id,
      name: handicraft.name,
      description: handicraft.description,
      image: handicraft.image,
      createdBy: handicraft.users.name,
      image_user: handicraft.users.image,
      id_user: handicraft.users.id,
      createdAt: handicraft.createdAt,
      updatedAt: handicraft.updatedAt,
      waste: handicraft.waste_handicraft.map((wasteHandicraft) => wasteHandicraft.waste.name),
      tags: handicraft.tag_handicraft.map((tagHandicraft) => tagHandicraft.tag.name),
      likes: handicraft.likes.length,
      totalStep: handicraft.detail_handicraft.length,
    }));

    const lastPage = Math.ceil(totalCount / Number(pageSize));

    // Kirim respons dengan data karya kerajinan yang ditemukan
    res.status(200).json({
      message: "Image detected successfully",
      data: result,
      pagination: {
        page: Number(page),
        pageSize: Number(pageSize),
        totalCount,
        lastPage,
      },
    });
  } catch (error: any) {
    return res.status(500).json({ message: "Error uploading image", data: error.message });
  }
};
