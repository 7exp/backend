import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Like
export const createLike = async (req: Request, res: Response) => {
  const { id_user, id_handicraft } = req.body;

  if (!id_user || !id_handicraft) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newLike = await prisma.likes.create({
      data: {
        id_user,
        id_handicraft,
      },
    });
    res.status(201).json({ message: "Like created", data: newLike });
  } catch (error: any) {
    res.status(500).json({ error: "Error creating like", message: error.message });
  }
};

// UnLike
export const deleteLike = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    await prisma.likes.delete({
      where: { id: id },
    });
    res.status(200).json({ message: `Like ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting like" });
  }
};

// like count
export const getLikeCount = async (req: Request, res: Response) => {
  const { id_handicraft } = req.params;

  try {
    const likes = await prisma.likes.count({
      where: { id_handicraft: id_handicraft },
    });
    res.status(200).json({ message: "Like count", data: likes });
  } catch (error) {
    res.status(500).json({ error: "Error fetching like count" });
  }
};
