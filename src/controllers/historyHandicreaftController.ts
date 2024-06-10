import { Request, Response } from "express";
import prisma from "../../prisma/client";

// create history handicraft
export const createHistoryHandicraft = async (req: Request, res: Response) => {
  const { id_handicraft, id_user, step_number } = req.body;

  if (!id_handicraft || !id_user || !step_number) {
    return res.status(400).json({ message: "All fields are required", data: [] });
  }

  const id_handicraftExists = await prisma.handicraft.findUnique({
    where: {
      id: id_handicraft,
    },
  });

  if (!id_handicraftExists) {
    return res.status(404).json({ message: "Handicraft not found", data: [] });
  }

  const id_userExists = await prisma.users.findUnique({
    where: {
      id: id_user,
    },
  });

  if (!id_userExists) {
    return res.status(404).json({ message: "User not found", data: [] });
  }

  const step_numberExists = await prisma.history_handicraft.findMany({
    where: {
      id_handicraft: id_handicraft,
      id_user: id_user,
      step_number: step_number,
    },
  });

  try {
    const newHistoryHandicraft = await prisma.history_handicraft.create({
      data: {
        id_handicraft,
        id_user,
        step_number,
      },
    });
    res.status(201).json({ message: "Successfully created historyHandicraft", data: newHistoryHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error creating historyHandicraft", data: error.message });
  }
};

// get one history handicraft
export const getHistoryHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const historyHandicraft = await prisma.history_handicraft.findUnique({
      where: {
        id: id,
      },
    });

    if (!historyHandicraft) {
      return res.status(404).json({ message: "History Handicraft not found" });
    }

    res.status(200).json({ message: "History Handicraft found", data: historyHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting history handicraft", data: error.message });
  }
};

// get all history handicraft
export const getAllHistoryHandicraft = async (req: Request, res: Response) => {
  try {
    const historyHandicraft = await prisma.history_handicraft.findMany({
      orderBy: {
        updatedAt: "desc",
      },
    });

    res.status(200).json({ message: "History Handicraft list", data: historyHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error getting history handicraft", data: error.message });
  }
};

// edit history handicraft
export const editHistoryHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { done } = req.body;

  if (!id) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  const historyHandicraft = await prisma.history_handicraft.findUnique({
    where: { id },
  });

  if (!historyHandicraft) {
    return res.status(404).json({ message: "History Handicraft not found", data: [] });
  }

  try {
    const updatedHistoryHandicraft = await prisma.history_handicraft.update({
      where: { id },
      data: {
        done,
      },
    });

    res.status(200).json({ message: "Successfully updated History Handicraft", data: updatedHistoryHandicraft });
  } catch (error: any) {
    res.status(500).json({ message: "Error updating history handicraft", data: error.message });
  }
};

// delete history handicraft
export const deleteHistoryHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.history_handicraft.delete({
      where: { id },
    });

    res.status(200).json({ message: "Successfully deleted History Handicraft", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting history handicraft", data: error.message });
  }
};

// delete all history handicraft where user id is logged in
export const deleteAllHistoryHandicraft = async (req: Request, res: Response) => {
  const { id_user } = req.body;

  if (!id_user) {
    return res.status(400).json({ message: "ID is required", data: [] });
  }

  try {
    await prisma.history_handicraft.deleteMany({
      where: { id_user },
    });

    res.status(200).json({ message: "Successfully deleted all History Handicraft", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting all history handicraft", data: error.message });
  }
};
