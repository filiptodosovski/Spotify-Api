import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");

const token =
  "BQCwerbAYh_RKiiPOvODY9Qm5NTy908lKQGXei61yzhU5vEtMqMBpcjM_5yeh9macDIhNe0KNqO6X2XSFedPoKCs0_aC5ny6vlk4tOIFIbZ9E-xjGicX8PyOlwkajB8NVvIp2k0wrw69CaP3PYCp21IUuAnS5-OGa0Rjm9wXkqkEKjsSIcNcp45NdIPpegsHJS5OY6tb3ez3jTEC1G-a72z7WfLub95RbfWcU2pHcwBu0PS-H-WOoQT_-CO5iYLMiCMIJ34TQQlWRh8ooUBmjbGdcQE1jClg7CR2Dnsgz1qBExU4vE1frTuOu3YPp2I3u6RU7vlfzCBzpHgCFLFe";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getPlaylistsForCategory(req: Request, res: Response){
  const playlist = await spotifyApi.getPlaylistsForCategory('0JQ5DAqbMKFEC4WFtoNRpw', {
    offset: 0,
    limit: 10
  })

  let playlists = []

  for(let playlist_ex of playlist.body.playlists.items) {
    playlists.push(playlist_ex.name)
  }

  res.send(playlists)
}

export default getPlaylistsForCategory
