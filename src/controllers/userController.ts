import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUser = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  const result = await prisma.users.create({ data: { name, email, address } });
  res.json({ data: result, message: `User created` });
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await prisma.users.findMany({
    select: { id: true, name: true, email: true, address: true },
  });
  res.json({ data: result, message: "User list" });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, address } = req.body;
  const result = await prisma.users.update({
    data: { name, email, address },
    where: { id: Number(id) },
  });
  res.json({ data: result, message: `User ${id} updated` });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.users.delete({ where: { id: Number(id) } });
  res.json({ message: `User ${id} deleted` });
};
