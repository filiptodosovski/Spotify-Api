import { Request, Response } from "express";
const getCategory =
  require("../services/get-category.service").getCategory;
const insertCategory =
  require("../services/get-category.service").insertCategory;

const getCategories = async (req: Request, res: Response) => {
  const tracks = await getCategory();
  return res.status(200).send(tracks);
};

const insertCategories = async (req: Request, res: Response) => {
  await insertCategory();
  return res.status(200).json({
    success: "added to database",
  });
};

module.exports = {
  getCategories,
  insertCategories,
};
