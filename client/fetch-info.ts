import axios from 'axios'

export const getAllCategories = () => axios.get('/api/category')

export const getPlaylistForCategory = (categoryId: string) => axios.get(`/api/category/fetch/${categoryId}`)

export const getAllPlaylists = () => axios.get('/api/playlists')

export const getTracksForCategory = (playlistId: string) => axios.get(`/api/playlists/fetch/${playlistId}`)