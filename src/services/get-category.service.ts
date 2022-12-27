const SpotifyWebApi = require("spotify-web-api-node");
const { accessToken } = require('../../config')
const { AppDataSource } = require('../db')
import Category from '../models/category.model';
 
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

async function getCategory() {
  const categoryRepository = AppDataSource.getRepository(Category);
  const allCategories = await categoryRepository.createQueryBuilder("category")
  .innerJoinAndSelect("category.playlist", "playlist")
  .getMany()
  return allCategories;
}

async function getCategoryById(id: string) {
  const categoryRepository = AppDataSource.getRepository(Category);
  const allCategories = await categoryRepository.find({
    where: {
      id
    },
    relations: ["playlist"]
  });
  return allCategories;
}

module.exports = {
  getCategory,
  getCategoryById
};
