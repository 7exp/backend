import { Request, Response } from "express";
import prisma from "../../prisma/client";

export const createProduct = async (req: Request, res: Response) => {
  const { name, category, price, sold, profit } = req.body;
  const result = await prisma.product.create({
    data: { name, category, price, sold, profit },
  });
  res.json({ data: result, message: `Product created` });
};

export const getProducts = async (req: Request, res: Response) => {
  const result = await prisma.product.findMany();
  res.json({ data: result, message: "Product list" });
};

export const updateProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, category, price, sold, profit } = req.body;
  const result = await prisma.product.update({
    data: { name, category, price, sold, profit },
    where: { id: Number(id) },
  });
  res.json({ data: result, message: `Product ${id} updated` });
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await prisma.product.delete({
    where: { id: Number(id) },
  });
  res.json({ message: `Product ${id} deleted` });
};
