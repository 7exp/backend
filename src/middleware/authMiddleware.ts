import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config";
import prisma from "../../prisma/client"; // Adjust the import path according to your project structure

interface UserData {
  id: string;
  name: string;
  role: string;
  address: string;
}

interface ValidationRequest extends Request {
  userData?: UserData;
}

// export const accessValidation = (req: Request, res: Response, next: NextFunction) => {
//   const validationReq = req as ValidationRequest;
//   const { authorization } = validationReq.headers;

//   if (!authorization) {
//     return res.status(401).json({ message: "Token is undefined or invalid" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const jwtDecode = jwt.verify(token, config.jwtSecret!);

//     if (typeof jwtDecode !== "string") {
//       validationReq.userData = jwtDecode as UserData;
//     }
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
//   next();
// };

export const accessValidation = async (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token is undefined or invalid", data: [] });
  }

  const token = authorization.split(" ")[1];

  try {
    const jwtDecode = jwt.verify(token, config.jwtSecret!);

    if (typeof jwtDecode !== "string") {
      const userData = jwtDecode as UserData;

      // Fetch user from the database using user ID
      const user = await prisma.users.findUnique({ where: { id: userData.id } });

      if (!user || user.token !== token) {
        return res.status(401).json({ message: "Unauthorized", data: [] });
      }

      validationReq.userData = userData;
    }
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", data: [] });
  }

  next();
};
export const accessValidationAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token is undefined or invalid", data: [] });
  }

  const token = authorization.split(" ")[1];

  try {
    const jwtDecode = jwt.verify(token, config.jwtSecret!) as UserData;

    // Fetch user from the database using user ID
    const user = await prisma.users.findUnique({ where: { id: jwtDecode.id } });

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Unauthorized", data: [] });
    }

    if (user.role !== "admin") {
      return res.status(403).json({ message: "You don't have permission", data: [] });
    }

    validationReq.userData = jwtDecode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", data: [] });
  }
};

export const accessValidationSelf = async (req: Request, res: Response, next: NextFunction) => {
  const validationReq = req as ValidationRequest;
  const { authorization } = validationReq.headers;

  if (!authorization) {
    return res.status(401).json({ message: "Token is undefined or invalid", data: [] });
  }

  const token = authorization.split(" ")[1];

  try {
    const jwtDecode = jwt.verify(token, config.jwtSecret!) as UserData;

    // Fetch user from the database using user ID
    const user = await prisma.users.findUnique({ where: { id: jwtDecode.id } });

    if (!user || user.token !== token) {
      return res.status(401).json({ message: "Unauthorized", data: [] });
    }

    validationReq.userData = jwtDecode;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized", data: [] });
  }
};

// export const accessValidationAdmin = (req: Request, res: Response, next: NextFunction) => {
//   const validationReq = req as ValidationRequest;
//   const { authorization } = validationReq.headers;

//   if (!authorization) {
//     return res.status(401).json({ message: "Token is undefined or invalid" });
//   }

//   const token = authorization.split(" ")[1];

//   try {
//     const jwtDecode = jwt.verify(token, config.jwtSecret!) as UserData;

//     if (jwtDecode.role !== "admin") {
//       return res.status(403).json({ message: "You don't have permission" });
//     }

//     validationReq.userData = jwtDecode;
//     next();
//   } catch (error) {
//     return res.status(401).json({ message: "Unauthorized" });
//   }
// };
