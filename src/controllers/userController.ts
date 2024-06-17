import { Request, Response } from "express";
import prisma from "../../prisma/client";
import bcrypt from "bcrypt";
import { deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

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

  try {
    // Find user by ID
    const user = await prisma.users.findUnique({ where: { id: id } });

    // If user not found, return error
    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }

    // Compare old password with the user's stored password
    const isMatch = await bcrypt.compare(oldPassword, user.password as string);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password is incorrect", data: [] });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    await prisma.users.update({
      where: { id: id },
      data: { password: hashedPassword },
    });

    // Respond with success message
    return res.status(200).json({ message: "Password updated successfully", data: [] });
  } catch (error: any) {
    // Respond with server error
    return res.status(500).json({ message: "Internal server error", data: error.message });
  }
};

export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const user = await prisma.users.findUnique({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    } else {
      await prisma.users.delete({ where: { id } });

      if (user.image) {
        const fileName = user.image.split("/").pop() || "";
        const filePath = `user/${fileName}`;

        // Cek apakah filePath adalah default.png
        if (filePath !== "user/default.png") {
          await deleteFileGCS(config.bucketName as string, filePath);
        }
      }
      res.json({ message: `Successfully deleted user`, data: [] });
    }
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting user", data: error.message });
  }
};

export const deleteSelf = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    // Find the user by ID
    const user = await prisma.users.findUnique({ where: { id: id } });

    if (!user) {
      return res.status(404).json({ message: "User not found", data: [] });
    }

    // Compare the provided password with the stored hashed password
    const isMatch = await bcrypt.compare(password, user.password as string);
    if (!isMatch) {
      return res.status(400).json({ message: "Password is incorrect", data: [] });
    }

    // Delete the user from the database
    await prisma.users.delete({ where: { id } });

    // If the user has an image, delete it from GCS if it's not the default image
    if (user.image) {
      const fileName = user.image.split("/").pop() || "";
      const filePath = `user/${fileName}`;

      if (filePath !== "user/default.png") {
        await deleteFileGCS(config.bucketName as string, filePath);
      }
    }

    res.status(200).json({ message: "Successfully deleted user", data: [] });
  } catch (error: any) {
    res.status(500).json({ message: "Error deleting user", data: error.message });
  }
};
