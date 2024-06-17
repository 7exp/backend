import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";
import { datacatalog } from "googleapis/build/src/apis/datacatalog";

interface UserData {
  id: string;
  name: string;
  role: string;
  address: string;
}

interface ValidationRequest extends Request {
  userData?: UserData;
}

export const historyHandicraftValidation = async (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;

  const { id } = req.params;
  const id_user = validationReq.userData?.id;

  try {
    const historyHandicraft = await prisma.history_handicraft.findFirst({
      where: {
        id: id,
        id_user: id_user,
      },
    });
    if (!historyHandicraft) {
      return res.status(403).json({ message: "You are not authorized to access this history handicraft", data: [] });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", data: [] });
  }
};

export const historyHandicraftValidationByidUser = async (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const id_user = validationReq.userData?.id;
  const { id } = req.params;

  try {
    // Verify if the logged-in user's ID matches the ID in the route parameter
    if (id_user !== id) {
      return res.status(403).json({ message: "You are not authorized to access this history handicraft", data: [] });
    }

    // Check if the history_handicraft record exists for the logged-in user
    const historyHandicraft = await prisma.history_handicraft.findFirst({
      where: {
        id_user: id_user,
      },
    });

    if (!historyHandicraft) {
      return res.status(403).json({ message: "You are not authorized to access this history handicraft", data: [] });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", data: [] });
  }
};
