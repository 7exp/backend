import { NextFunction, Request, Response } from "express";
import prisma from "../../prisma/client";

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
      return res.status(403).json({ message: "You are not authorized to access this handicraft" });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
