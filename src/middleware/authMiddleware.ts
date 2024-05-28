import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";

interface UserData {
  id: string;
  name: string;
  address: string;
}

interface ValidationRequest extends Request {
  userData?: UserData;
}

export const accessValidation = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token diperlukan untuk login" });
  }

  const token = authorization.split(" ")[1];

  try {
    const jwtDecode = jwt.verify(token, config.jwtSecret!);
    if (typeof jwtDecode !== "string") {
      validationReq.userData = jwtDecode as UserData;
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
  next();
};
