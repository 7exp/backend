import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Like
export const createLike = async (req: Request, res: Response) => {
  const { id_user, id_handicraft } = req.body;

  if (!id_user || !id_handicraft) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }

  const likeExist = await prisma.likes.findFirst({
    where: {
      id_user: id_user,
      id_handicraft: id_handicraft,
    },
  });

  if (likeExist) {
    const removeLike = await prisma.likes.delete({
      where: {
        id: likeExist.id,
      },
    });

    res.status(200).json({ message: "Successfully removed like", data: removeLike });
  } else {
    try {
      const newLike = await prisma.likes.create({
        data: {
          id_user,
          id_handicraft,
        },
      });
      res.status(201).json({ message: "Successfully created like", data: newLike });
    } catch (error: any) {
      res.status(500).json({ message: "Error creating like", data: error.message });
    }
  }
};

// UnLike
export const deleteLike = async (req: Request, res: Response) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  try {
    await prisma.likes.delete({
      where: { id: id },
    });
    res.status(200).json({ message: `Like ${id} deleted`, data: [] });
  } catch (error) {
    res.status(500).json({ message: "Error deleting like", data: error });
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
    res.status(500).json({ message: "Error fetching like count", data: error });
  }
};

// get like by user id
export const getLikeByUserId = async (req: Request, res: Response) => {
  const { id_user } = req.params;

  try {
    const likes = await prisma.likes.findMany({
      where: { id_user: id_user },
    });

    const data = await Promise.all(
      likes.map(async (like) => {
        const handicraft = await prisma.handicraft.findUnique({
          where: { id: like.id_handicraft },
        });
        const user = await prisma.users.findUnique({
          where: { id: like.id_user },
        });
        const waste = await prisma.waste_handicraft.findMany({
          where: { id_handicraft: like.id_handicraft },
        });
        const tags = await prisma.tag_handicraft.findMany({
          where: { id_handicraft: like.id_handicraft },
        });
        const totalImages = await prisma.detail_handicraft.count({
          where: { id_handicraft: like.id_handicraft },
        });
        const likes = await prisma.likes.count({
          where: { id_handicraft: like.id_handicraft },
        });
        const totalStep = await prisma.detail_handicraft.count({
          where: { id_handicraft: like.id_handicraft },
        });

        const data = {
          ...handicraft,
          createdBy: user?.name,
          image_user: user?.image,
          tags: tags.map((tag) => tag.id_tag),
          waste: waste.map((waste) => waste.id_waste),
          likes,
          totalStep,
          totalImages,
        };
        const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
        data.waste = wasteName.map((waste) => waste.name);
        const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
        data.tags = tagsName.map((tag) => tag.name);

        return data;
      })
    );

    res.status(200).json({ message: "Likes found", data });
  } catch (error) {
    res.status(500).json({ message: "Error fetching likes", data: error });
  }
};
