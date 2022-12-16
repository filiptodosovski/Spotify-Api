import SpotifyWebApi from 'spotify-web-api-node'

class SpotifyPackage {
  constructor(private readonly spotifyApi: SpotifyWebApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET
  })
  ){
    this.getAccessToken().then(() => console.log('Spotify successfully authorized'))
  }

  async getAccessToken() {
    const {body: {access_token: accessToken}} = await this.spotifyApi.clientCredentialsGrant()
    this.spotifyApi.setAccessToken(accessToken)
  }

  async handleError(cb: any, numOfTries: number, error: unknown) {
    console.log('Error happened in SpotifyService, trying to survive', error)
    if (numOfTries <= 0) {
      console.error(`SpotifyService encountered the following error: ${error}`)
      return 
    }
    await this.getAccessToken()
    cb() 
  }

  async getCategories(numOfTries: number = 3) {
     try {
      return await this.spotifyApi.getCategories({
        offset: 0,
        limit: 39
      });
     } catch (error) {
      await this.handleError(() => this.getCategories(numOfTries-1), numOfTries, error)
     } 
  }

  async getPlaylistsForCategory(categoryId: string, numOfTries: number = 3) {
    try {
     return await this.spotifyApi.getPlaylistsForCategory(categoryId);
    } catch (error) {
     await this.handleError(() => this.getPlaylistsForCategory(categoryId, numOfTries-1), numOfTries, error)
    } 
 }

 async getPlaylistTracks(playlistId: string, numOfTries = 3) {
  try {
    return await this.spotifyApi.getPlaylistTracks(playlistId, {
      offset: 1,
      limit: 2
    });
  } catch (error) {
    await this.handleError(() => this.getPlaylistTracks(playlistId, numOfTries-1), numOfTries, error)
  }
 }
}

export type {SpotifyPackage as TSpotifyPackage}

export default new SpotifyPackage()