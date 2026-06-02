import axios from "axios"
import type { Movie } from "../types/movie"

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
  },
})

interface SearchParams {
  query: string
  includeAdult: boolean
  language: string
}

export const searchMovies = async ({
  query,
  includeAdult,
  language,
}: SearchParams): Promise<Movie[]> => {
  const response = await api.get("/search/movie", {
    params: {
      query,
      include_adult: includeAdult,
      language,
      page: 1,
    },
  })

  return response.data.results
}