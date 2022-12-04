import { Request, Response } from 'express';
const SpotifyWebApi = require("spotify-web-api-node");


const token =
  "BQDKp5IhrOeQPXlqdL90lBqg6gEyOgYhwyfcbcGDVyQ43nhK3a--_yMwtuCniTN0xBwaVoPGNdLTAlvCz2gLbSqDG7dnDIIJ7ObeQheqPbT8iw4xrdcGmZvXqIzVvmcapQQFHtPyqAnjogP8hwDEe5fhFdwt7cxoya8W13lkxr0QNRgcBV_g3Lp-qwOn8LpNNwfYtNH1UoL_I_sfYyqWo06uEAmOwqNj_FWpTVHOnHT9NyZhdRG2L1oVm_tpm804YGfVM_sgcfwvLJAhfclwlAM54nb_ntdfAyiqSTQJ7DI2o-ZypVMZ3bgS6jwdxEyLS0iRgW448vBwNxKbzuxB";

const spotifyApi = new SpotifyWebApi();
spotifyApi.setAccessToken(token);

async function getUserData (req: Request, res: Response){
  const me = await spotifyApi.getMe();
  res.send(me.body)
}

export default getUserData;