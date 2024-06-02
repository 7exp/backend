import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
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

export const accessValidation = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token is undefined or invalid" });
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

export const accessValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token is undefined or invalid" });
  }

  const token = authorization.split(" ")[1];

  try {
    const jwtDecode = jwt.verify(token, config.jwtSecret!) as UserData;

    if (jwtDecode.role !== "admin") {
      return res.status(403).json({ message: "You don't have permission" });
    }

    validationReq.userData = jwtDecode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
