import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const createUser = async (req: Request, res: Response) => {
  const { name, email, address } = req.body;
  //if user exists then return error
  const user = await prisma.users.findUnique({ where: { email } });
  if (user) {
    return res.status(400).json({ message: "User already exists", data: [] });
  } else {
    const result = await prisma.users.create({ data: { name, email, address } });
    res.json({ message: `User created`, data: result });
  }
};

export const getUsers = async (req: Request, res: Response) => {
  const result = await prisma.users.findMany({
    select: { id: true, name: true, email: true, address: true, image: true },
  });
  res.json({ message: "User list", data: result });
};

export const getUsersById = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.users.findUnique({
    where: { id: id },
    select: { id: true, name: true, email: true, address: true, image: true },
  });
  res.json({ message: "User list", data: result });
};

export const updateUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, email, address } = req.body;
  // if user not found return error
  const user = await prisma.users.findUnique({ where: { id: id } });
  if (!user) {
    return res.status(404).json({ message: "User not found", data: [] });
  } else {
    const result = await prisma.users.update({
      data: { name, email, address },
      where: { id: id },
    });
    res.json({ message: `Successfully updated user`, data: result });
  }
};

// update user role
export const updateUserRole = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { role } = req.body;
  // if user not found return error
  const user = await prisma.users.findUnique({ where: { id: id } });
  if (!user) {
    return res.status(404).json({ message: "User not found", data: [] });
  } else {
    const result = await prisma.users.update({
      data: { role },
      where: { id: id },
    });
    res.json({ message: `Successfully updated user role`, data: result });
  }
};

// update password old password required for update password
export const updatePassword = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { oldPassword, newPassword } = req.body;
  // if user not found return error
  const user = await prisma.users.findUnique({ where: { id: id } });
  if (!user) {
    return res.status(404).json({ message: "User not found", data: [] });
  } else {
    if (oldPassword !== user.password) {
      return res.status(400).json({ message: "Old password is incorrect", data: [] });
    }
    const result = await prisma.users.update({
      data: { password: newPassword },
      where: { id: id },
    });
    res.json({ message: `Successfully updated password`, data: result });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.users.delete({ where: { id: id } });
  res.json({ message: `Successfully deleted user`, data: id });
};
