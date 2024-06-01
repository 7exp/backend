import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  //if user exists then return error
  const user = await prisma.users.findUnique({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "User already exists" });
  } else {
    const result = await prisma.users.create({ data: { name, email, address } });
    res.json({ message: `User created`, data: result });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await prisma.users.findMany({
    select: { id: true, name: true, email: true, address: true },
  });
  res.json({ message: "User list", data: result });
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.users.findUnique({
    where: { id: id },
    select: { id: true, name: true, email: true, address: true },
  });
  res.json({ message: "User list", data: result });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, address, role } = req.body;
  const result = await prisma.users.update({
    data: { name, email, address, role },
    where: { id: id },
  });
  res.json({ message: `User ${id} updated`, data: result });
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.users.delete({ where: { id: id } });
  res.json({ message: `User ${id} deleted` });
};
