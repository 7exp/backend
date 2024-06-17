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

export const handicraftValidation = async (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;

  const { id_handicraft } = req.params;
  const id_user = validationReq.userData?.id;

  try {
    const handicraft = await prisma.handicraft.findFirst({
      where: {
        id: id_handicraft,
        id_user: id_user,
      },
    });
    if (!handicraft) {
      return res.status(403).json({ message: "You are not authorized to access this handicraft", data: [] });
    }

    next();
  } catch (error) {
    return res.status(500).json({ message: "Internal server error", data: [] });
  }
};
