import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const fyp = async (req: Request, res: Response): Promise<void> => {
  try {
    const { user_id } = req.params;

    // Fetch the user's history of liked handicrafts
    const userLikedHandicrafts = await prisma.likes.findMany({
      where: { id_user: user_id },
      select: { id_handicraft: true },
    });

    // Extract the IDs of the liked handicrafts
    const likedHandicraftIds = userLikedHandicrafts.map((like) => like.id_handicraft);

    // Find tags associated with the user's liked handicrafts
    const likedHandicraftTags = await prisma.tag_handicraft.findMany({
      where: { handicraft: { id: { in: likedHandicraftIds } } },
      select: { id_tag: true },
    });

    // Extract the IDs of the tags associated with the user's liked handicrafts
    const likedTagIds = likedHandicraftTags.map((tag) => tag.id_tag);

    // Find handicrafts created by the user
    const userHandicrafts = await prisma.handicraft.findMany({
      where: { id_user: user_id },
      select: { id: true },
    });

    // Extract the IDs of the user's own handicrafts
    const userHandicraftIds = userHandicrafts.map((handicraft) => handicraft.id);

    // Find other handicrafts with similar tags
    const recommendedHandicrafts = await prisma.handicraft.findMany({
      where: {
        tag_handicraft: {
          some: {
            id_tag: {
              in: likedTagIds,
            },
          },
        },
        id: {
          notIn: likedHandicraftIds.concat(userHandicraftIds), // Exclude user's own handicrafts
        },
      },
      orderBy: {
        likes: {
          _count: "desc",
        },
      },
    });

    res.status(200).json({ message: "Successfully fetched recommended handicrafts", data: recommendedHandicrafts });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching recommended handicrafts", error: error.message });
  }
};

// tranding handicraft
export const trendingHandicrafts = async (req: Request, res: Response): Promise<void> => {
  try {
    // get the top 5 handicrafts that have been liked the most in the last 14 days
    const trendingHandicrafts = await prisma.handicraft.findMany({
      where: {
        createdAt: {
          gte: new Date(new Date().getTime() - 14 * 24 * 60 * 60 * 1000),
        },
      },
      orderBy: {
        likes: {
          _count: "desc", // Sort by the number of likes in descending order
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        createdAt: true,
        likes: {
          select: {
            id: true,
          },
        },
      },
      take: 5, // Limit to 5 handicrafts
    });
    res.status(200).json({ message: "Successfully fetched trending handicrafts", data: trendingHandicrafts });
  } catch (error: any) {
    res.status(500).json({ message: "Error fetching trending handicrafts", error: error.message });
  }
};
