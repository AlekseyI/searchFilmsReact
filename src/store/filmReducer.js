import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { filmsService } from "../services/api/films";

const initialState = {
  isLoading: false,
  films: [],
  error: null,
  totalPages: 0,
  page: 1
};

const filmSlice = createSlice({
  name: "film",
  initialState,
  reducers: {
    setIsLoadingFilms(state, action) {
      state.isLoading = action.payload;
    },
    setFilms(state, action) {
      state.films = action.payload;
    },
    setPage(state, action) {
      state.page = action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
    setAddFilms(state, action) {
      state.films = [...state.films, ...action.payload];
    },
    setErrorFilms(state, action) {
      state.error = action.payload;
    },
  },
});

export const { setIsLoadingFilms, setErrorFilms, setFilms, setAddFilms, setPage, setTotalPages } =
  filmSlice.actions;

export const selectFilm = (state) => state.film;

const setPageInfo = (dispatch, page, totalPages) => {
  dispatch(setPage(page));
  dispatch(setTotalPages(totalPages));
}

export const getPopularFilms = createAsyncThunk(
  "film/getPopularFilms",
  async ({ page, isAdd }, { dispatch }) => {
    try {
      dispatch(setErrorFilms(null));
      dispatch(setIsLoadingFilms(true));
      const response = await filmsService.getPopular(page);
      setPageInfo(dispatch, response.data.page, response.data.total_pages);
      if (isAdd) {
        dispatch(setAddFilms(response.data.results));
      } else {
        dispatch(setFilms(response.data.results));
      }
      dispatch(setIsLoadingFilms(false));
    } catch (e) {
      dispatch(setIsLoadingFilms(false));
      dispatch(setErrorFilms(e.message));
    }
  }
);

export const getFilmsByName = createAsyncThunk(
  "film/getFilmsByName",
  async ({ name, page, isAdd }, { dispatch }) => {
    try {
      dispatch(setErrorFilms(null));
      dispatch(setIsLoadingFilms(true));
      const response = await filmsService.findByName(name, page);
      setPageInfo(dispatch, response.data.page, response.data.total_pages);
      if (isAdd) {
        dispatch(setAddFilms(response.data.results));
      } else {
        dispatch(setFilms(response.data.results));
      }
      dispatch(setIsLoadingFilms(false));
    } catch (e) {
      dispatch(setIsLoadingFilms(false));
      dispatch(setErrorFilms(e.message));
    }
  }
);

export default filmSlice.reducer;