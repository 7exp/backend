import { Request, Response } from "express";
import prisma from "../../prisma/client";
import { v4 as uuidv4 } from "uuid";
import { uploadFileGCS, deleteFileGCS } from "../utils/bucketImage";
import { config } from "../config";

// create handicraft without image
export const createHandicraft = async (req: Request, res: Response) => {
  const { name, description, id_user, waste, tags } = req.body;

  let id_handicraft = "";

  // tag is array of string, add 1 by 1 in table tag
  for (let i = 0; i < tags.length; i++) {
    // if tag already exist, skip
    const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
    if (tag) continue;
    await prisma.tag.create({
      data: {
        name: tags[i],
      },
    });
    console.log("tag created");
  }

  if (!name || !description || !id_user || !waste || !tags) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const newHandicraft = await prisma.handicraft.create({
      data: {
        name,
        description,
        id_user,
      },
    });

    id_handicraft = newHandicraft.id;

    for (let i = 0; i < waste.length; i++) {
      const wastename = await prisma.waste.findMany({ where: { name: waste[i] } });
      if (wastename) {
        await prisma.waste_handicraft.create({
          data: {
            id_handicraft: id_handicraft,
            id_waste: wastename[0].id,
          },
        });
      }
    }

    for (let i = 0; i < tags.length; i++) {
      const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
      if (tag) {
        await prisma.tag_handicraft.create({
          data: {
            id_handicraft: id_handicraft,
            id_tag: tag.id,
          },
        });
      }
    }

    const payload = {
      id: id_handicraft,
      name: name,
      description: description,
      id_user: id_user,
      waste: waste,
      tags: tags,
    };

    res.status(201).json({ message: "Successfully created Handicraft", data: payload });
  } catch (error: any) {
    res.status(500).json({ error: "Error creating handicraft", message: error.message });
  }
};

// Update Handicraft
export const updateHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { name, description, id_user, waste = [], tags = [] } = req.body;

  if (!id) {
    return res.status(400).json({ error: "ID is required" });
  }

  try {
    // Only update fields if they are provided
    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (id_user) updateData.id_user = id_user;

    await prisma.handicraft.update({
      where: { id },
      data: updateData,
    });

    // Update waste and tags only if they are provided
    if (waste.length > 0) {
      await prisma.waste_handicraft.deleteMany({
        where: { id_handicraft: id },
      });

      for (let i = 0; i < waste.length; i++) {
        const wastename = await prisma.waste.findMany({ where: { name: waste[i] } });
        if (wastename) {
          await prisma.waste_handicraft.create({
            data: {
              id_handicraft: id,
              id_waste: wastename[0].id,
            },
          });
        }
      }
    }

    if (tags.length > 0) {
      await prisma.tag_handicraft.deleteMany({
        where: { id_handicraft: id },
      });

      for (let i = 0; i < tags.length; i++) {
        const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
        if (tag) {
          await prisma.tag_handicraft.create({
            data: {
              id_handicraft: id,
              id_tag: tag.id,
            },
          });
        }
      }
    }

    const getHandicraftById = await prisma.handicraft.findUnique({
      where: { id },
      include: {
        waste_handicraft: {
          select: {
            id_waste: true,
            waste: {
              select: {
                name: true,
              },
            },
          },
        },
        tag_handicraft: {
          select: {
            id_tag: true,
            tag: {
              select: {
                name: true,
              },
            },
          },
        },
      },
    });

    const payload = {
      id: getHandicraftById?.id,
      name: getHandicraftById?.name,
      description: getHandicraftById?.description,
      image: getHandicraftById?.image,
      id_user: getHandicraftById?.id_user,
      waste: getHandicraftById?.waste_handicraft.map((waste) => waste.waste.name),
      tags: getHandicraftById?.tag_handicraft.map((tag) => tag.tag.name),
    };

    res.status(200).json({ message: "Successfully updated Handicraft", data: payload });
  } catch (error: any) {
    res.status(500).json({ error: "Error updating handicraft", message: error.message });
  }
};

// Get All Handicrafts
export const getAllHandicrafts = async (req: Request, res: Response) => {
  try {
    const handicrafts = await prisma.handicraft.findMany();
    res.status(200).json({ data: handicrafts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching handicrafts" });
  }
};

// Get Handicraft by ID
export const getHandicraftById = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const handicraft = await prisma.handicraft.findUnique({
      where: { id },
    });

    if (!handicraft) {
      return res.status(404).json({ error: "Handicraft not found" });
    }

    const user = await prisma.users.findMany({ where: { id: handicraft.id_user } });
    const waste = await prisma.waste_handicraft.findMany({ where: { id_handicraft: id } });
    const tags = await prisma.tag_handicraft.findMany({ where: { id_handicraft: id } });
    const likes = await prisma.likes.count({ where: { id_handicraft: id } });
    const totalStep = await prisma.detail_handicraft.count({ where: { id_handicraft: id } });

    const data = { ...handicraft, createdBy: user[0].name, waste: waste.map((waste) => waste.id_waste), tags: tags.map((tag) => tag.id_tag), likes, totalStep };
    const wasteName = await prisma.waste.findMany({ where: { id: { in: waste.map((waste) => waste.id_waste) } } });
    data.waste = wasteName.map((waste) => waste.name);
    const tagsName = await prisma.tag.findMany({ where: { id: { in: tags.map((tag) => tag.id_tag) } } });
    data.tags = tagsName.map((tag) => tag.name);

    res.status(200).json({ message: "Successfully fetched Handicraft", data: data });
  } catch (error) {
    res.status(500).json({ error: "Error fetching handicraft" });
  }
};

// Delete Handicraft also delete image from GCS and delete waste_handicraft and tag_handicraft
export const deleteHandicraft = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    const handicraft = await prisma.handicraft.findUnique({ where: { id: id } });

    if (!handicraft) {
      return res.status(404).json({ error: "Handicraft not found" });
    }

    const image = handicraft.image;
    if (image) {
      const fileName = image.split("/").pop();
      const filePath = `handicraft/${fileName}`;
      await deleteFileGCS(config.bucketName as string, filePath);
    }

    await prisma.waste_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.tag_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.likes.deleteMany({ where: { id_handicraft: id } });
    await prisma.detail_handicraft.deleteMany({ where: { id_handicraft: id } });
    await prisma.handicraft.delete({ where: { id: id } });

    res.status(200).json({ message: `Handicraft with id ${id} deleted` });
  } catch (error) {
    res.status(500).json({ error: "Error deleting handicraft" });
  }
};

// search handicraft by any field
export const searchHandicraft = async (req: Request, res: Response) => {
  const { query } = req.query;

  try {
    const handicrafts = await prisma.handicraft.findMany({
      where: {
        OR: [
          {
            name: {
              contains: query as string,
            },
          },
          {
            description: {
              contains: query as string,
            },
          },
        ],
      },
    });

    res.status(200).json({ data: handicrafts });
  } catch (error) {
    res.status(500).json({ error: "Error fetching handicrafts" });
  }
};

// Create Handicraft include image
// export const createHandicraft = async (req: Request, res: Response) => {
//   const { name, description, id_user } = req.body;
//   const waste = req.body.waste.split(",");
//   const tags = req.body.tags.split(",");
//   const image = req.file as Express.Multer.File;

//   let id_handicraft = "";
//   const filename = image?.originalname;
//   const fileOutputName = `${uuidv4()}-${filename}`;

//   // tag is array of string, add 1 by 1 in table tag
//   for (let i = 0; i < tags.length; i++) {
//     // if tag already exist, skip
//     const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
//     if (tag) continue;
//     await prisma.tag.create({
//       data: {
//         name: tags[i],
//       },
//     });
//     // console.log("tag created");
//   }

//   if (!name || !description || !image || !id_user || !waste || !tags) {
//     return res.status(400).json({ error: "All fields are required" });
//   }

//   try {
//     await uploadFileGCS(config.bucketName as string, image, fileOutputName as string, "handicraft");
//     const public_url = `https://storage.googleapis.com/${config.bucketName}/handicraft/${fileOutputName}`;
//     const newHandicraft = await prisma.handicraft.create({
//       data: {
//         name,
//         description,
//         image: public_url,
//         id_user,
//       },
//     });

//     id_handicraft = newHandicraft.id;

//     for (let i = 0; i < waste.length; i++) {
//       const wastename = await prisma.waste.findMany({ where: { name: waste[i] } });
//       if (wastename) {
//         await prisma.waste_handicraft.create({
//           data: {
//             id_handicraft: id_handicraft,
//             id_waste: wastename[0].id,
//           },
//         });
//       }
//     }

//     for (let i = 0; i < tags.length; i++) {
//       const tag = await prisma.tag.findUnique({ where: { name: tags[i] } });
//       if (tag) {
//         await prisma.tag_handicraft.create({
//           data: {
//             id_handicraft: id_handicraft,
//             id_tag: tag.id,
//           },
//         });
//       }
//     }

//     const payload = {
//       id: id_handicraft,
//       name: name,
//       description: description,
//       image: public_url,
//       id_user: id_user,
//       waste: waste,
//       tags: tags,
//     };

//     res.status(201).json({ message: "Successfully created Handicraft", data: payload });
//   } catch (error: any) {
//     // If there's an error after the file upload, delete the file from GCS
//     const filePath = `handicraft/${fileOutputName}`;
//     try {
//       await deleteFileGCS(config.bucketName as string, filePath);
//       console.log("Rolled back file upload");
//     } catch (rollbackError) {
//       console.error("Error rolling back file upload:", rollbackError);
//     }
//     res.status(500).json({ error: "Error creating handicraft", message: error.message });
//   }
// };
