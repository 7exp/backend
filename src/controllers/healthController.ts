import { Request, Response } from "express";
import prisma from "../../prisma/client";

// health check status 200 ok for monitoring server

export const healthCheck = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Server is running", data: []});
};
