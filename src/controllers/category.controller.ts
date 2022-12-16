import { NextFunction, Request, Response } from "express";
import { BadRequest } from "../errorhandler/BadRequest";
const getCategory = require("../services/get-category.service").getCategory;
const getCategoryById = require('../services/get-category.service').getCategoryById
import SpotifyPackage from '../packages/spotify.package'

const getCategoriesFromSpotify = async (req: Request, res: Response, next: NextFunction) => {
  try {
   const categories = await SpotifyPackage.getCategories()
   return res.status(200).send(categories);
  } catch (error) {
    next(error)
  }
}


const getCategories = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const categories = await getCategory();
    return res.status(200).send(categories);
  } catch (error) {
    next(error)
  }
};

const insertCategories = async (req: Request, res: Response) => {
  try {
    const id = req.params.id
    const category = await getCategoryById(id);
    return res.status(200).json(
      category
    );
  } catch (error) {
    throw new BadRequest("Api Bad Request")
  }
};

module.exports = {
  getCategories,
  insertCategories,
  getCategoryById,
  getCategoriesFromSpotify
};
