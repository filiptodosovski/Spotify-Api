const Pool = require('pg').Pool

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1493',
  port: 5432,
})

export default pool

// async function getCategory1() {
//     const client = new Client({user: 'postgres', password: '1493', database: 'postgres'})
//     try {
//         await client.connect();         
//         await client.query(
//             `SELECT * FROM spotify_categories`);
//         return true;
//     } catch (error) {
//         if(error instanceof Error) {
//         console.log(error.stack);
//        } else
//         return false;
//     } finally {
//         await client.end();            
//     }
// };



// //   async function insertCategory(id: any, name: string) {
// //     const client = new Client({user: 'postgres', password: '1493', database: 'postgres'})
// //     try {
// //         await client.connect();         
// //         await client.query(
// //             `INSERT INTO "spotify_categories" ("id", "category_name")  
// //              VALUES ($1, $2)`, [id, name]);
// //         return true;
// //     } catch (error) {
// //         if(error instanceof Error) {
// //         console.log('Item already inserted');
// //        } else
// //         return false;
// //     } finally {
// //         await client.end();            
// //     }
// // };

// async function insertPlaylistForCategory(id: any, name: string) {
//     const client = new Client({user: 'postgres', password: '1493', database: 'postgres'})
//     try {
//         await client.connect();         
//         await client.query(
//             `INSERT INTO "category_playlists" ("id", "playlist_name")  
//              VALUES ($1, $2)`, [id, name]);
//         return true;
//     } catch (error) {
//         if(error instanceof Error) {
//         console.log(error.stack);
//        } else
//         return false;
//     } finally {
//         await client.end();            
//     }
// };

// async function insertTracks(id: any, name: string, artist: string) {
//     const client = new Client({user: 'postgres', password: '1493', database: 'postgres'})
//     try {
//         await client.connect();         
//         await client.query(
//             `INSERT INTO "playlist_tracks" ("id", "track_name", "artist")  
//              VALUES ($1, $2, $3)`, [id, name, artist]);
//         return true;
//     } catch (error) {
//         if(error instanceof Error) {
//         console.error("There is a error")
//        } else
//         return false;
//     } finally {
//         await client.end();            
//     }
// };

// module.exports.getCategory1 = getCategory1;
// module.exports.insertPlaylistForCategory = insertPlaylistForCategory;
// module.exports.insertTracks = insertTracks;
