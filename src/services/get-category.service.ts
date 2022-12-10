const SpotifyWebApi = require("spotify-web-api-node");
const { accessToken } = require('../../config')
const { AppDataSource } = require('../db')
import Category from '../models/category.model';
 
const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(accessToken);

async function getCategory() {
  const categoryRepository = AppDataSource.getRepository(Category);
  const allCategories = await categoryRepository.find();
  return allCategories;
  // return new Promise ((resolve, reject) => 
  // pool.query(
  //   "SELECT * FROM spotify_categories ORDER BY category_name ASC",
  //   (error: any, results: { rows: any }) => {
  //     if (error) {
  //       return reject(error);
  //     }
  //       return resolve(results.rows);
  //   }
  // ));
}

async function insertCategory() {
  const fetch_category = await spotifyApi.getCategories({
    offset: 0,
    limit: 39
  });



  const items = fetch_category.body.categories.items;
  await Promise.all(items.map( (element: { id: string; name: string; }) => {
    let category = new Category()
    let categoryRepository = AppDataSource.getRepository(Category);
    category.id = element.id;
    category.category_name = element.name;
    categoryRepository.save(category);
    console.log(category)
  }));

  
  console.log('Category was added')




//   let id;
//   let name;

//   return new Promise ((resolve, reject) => {
//   for (let category_obj of category.body.categories.items) {
//     id = category_obj.id;
//     name = category_obj.name;
//     pool.query(
//       'INSERT INTO "spotify_categories" ("id", "category_name") VALUES ($1, $2) ON CONFLICT DO NOTHING',
//       [id, name],
//       (error: any, results: { rows: any }) => {
//         if (error) {
//           return reject(error);
//         }
//           return resolve(results.rows)
//       }
//     );
//   }
// })
// };
}

module.exports = {
  getCategory,
  insertCategory,
};
