import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const recognition = async (req: Request, res: Response) => {
  const { wasteNames } = req.body; // Ambil array nama bahan bekas dari request body

  try {
    // Cari karya kerajinan yang terkait dengan bahan bekas yang diberikan
    const handicrafts = await prisma.handicraft.findMany({
      where: {
        waste_handicraft: {
          some: {
            waste: {
              name: {
                in: wasteNames, // Filter berdasarkan nama bahan bekas
              },
            },
          },
        },
      },
      include: {
        users: true, // Sertakan informasi pengguna
        tag_handicraft: {
          include: {
            tag: true, // Sertakan informasi tag
          },
        },
        likes: true, // Sertakan jumlah suka
      },
    });

    // Menyusun data untuk respons sesuai dengan kebutuhan array [] dari handicrafts
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
        id: tagHandicraft.tag.id,
        name: tagHandicraft.tag.name,
      })),
      likesCount: handicraft.likes.length,
    }));

    // Kirim respons dengan data karya kerajinan yang ditemukan
    res.status(200).json({ handicrafts: result });
  } catch (error) {
    console.error("Error retrieving handicrafts:", error);
    res.status(500).json({ error: "Failed to retrieve handicrafts" });
  }
};
