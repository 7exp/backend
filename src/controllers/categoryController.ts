import { Request, Response } from "express";
import prisma from "../../prisma/client";

// Create Category
export const createCategory = async (req: Request, res: Response) => {
  const { name } = req.body;

  try {
    const newCategory = await prisma.category_craft.create({
      data: {
        name,
      },
    });
    res.status(201).json({  message: "Category created", data: newCategory });
  } catch (error) {
    res.status(500).json({ error: "Error creating category" });
  }
};

// Get All Categories
export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await prisma.category_craft.findMany();
    res.status(200).json({ message : "Category list", data: categories });
  } catch (error) {
    res.status(500).json({ error: "Error fetching categories" });
  }
};

// Get Category by ID
export const getCategoryById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const category = await prisma.category_craft.findUnique({
      where: { id },
    });

    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    res.status(200).json({ message : "Category found", data: category });
  } catch (error) {
    res.status(500).json({ error: "Error fetching category" });
  }
};

// Update Category
export const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name } = req.body;

  if(!id || !name) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const updatedCategory = await prisma.category_craft.update({
      where: { id },
      data: {
        name,
      },
    });

    res.status(200).json({ message: "Category updated", data: updatedCategory  });
  } catch (error) {
    res.status(500).json({ error: "Error updating category" });
  }
};

// Delete Category
export const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.category_craft.delete({
      where: { id },
    });

    res.status(200).json({ message: `Category ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting category" });
  }
};
