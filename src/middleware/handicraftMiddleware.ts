import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../prisma/client";

import { config } from "../config";

interface UserData {
  id: string;
  name: string;
  role: string;
  address: string;
}

interface ValidationRequest extends Request {
  userData?: UserData;
}

export const handicraftValidation = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;

  const { id_handicraft } = req.params;
  const id_user = validationReq.userData?.id;

  const handicraft = prisma.handicraft.findFirst({
    where: {
      id: id_handicraft,
      id_user: id_user,
    },
  });

  if (!handicraft) {
    return res.status(403).json({ message: "You are not authorized to access this resource" });
  }

  next();
};
