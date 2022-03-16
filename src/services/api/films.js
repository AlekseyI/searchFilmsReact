import { httpClient } from "../httpClient/httpClient";

const API_KEY = "50be4cb6c536c73a29fe90183111be37";

const SEARCH_BASE_URL = "search/movie";

const POPULAR_URL = "movie/popular";

const FILTER_BASE_URL = `movie/popular?api_key=${API_KEY}&page=5`;

const POSTER_SIZE = "w300";

const POSTER_SIZE_BIG = "w500";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/";

export const getImageUrl = (imagePath, isBig) =>
  imagePath
    ? IMAGE_BASE_URL + (isBig ? POSTER_SIZE_BIG : POSTER_SIZE) + imagePath
    : isBig
    ? "../images/no_preview_w500.jpg"
    : "../images/no_preview_w300.jpg";

export const filmsService = {
  getPopular(page=1) {
    return httpClient.get(POPULAR_URL, {
      api_key: API_KEY,
      page: page
    });
  },
  findByName(name, page=1) {
    return httpClient.get(SEARCH_BASE_URL, {
      api_key: API_KEY,
      query: name,
      page: page
    });
  },
  getById(id) {
    return httpClient.get("products", { id });
  },
};