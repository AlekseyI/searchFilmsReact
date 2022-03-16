import React, { useEffect, useRef, useState } from "react";
import { Box, FormControl, Grid, TextField } from "@mui/material";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import {
  getFilmsByName,
  getPopularFilms,
  selectFilm,
} from "../../store/filmReducer";
import FilmList from "../../components/FilmList";
import { useObserver } from "../../hooks/useObserver";

const FilmsPage = () => {
  const filmState = useSelector(selectFilm);
  const dispatch = useDispatch();
  const [findQuery, setFindQuery] = useState("");
  const [viewPage, setViewPage] = useState(filmState.page);
  const elementNewPage = useRef();
  const argPopularFilms = { page: viewPage, isAdd: false };
  const argFilmsByName = { name: findQuery, ...argPopularFilms };

  let filmsSchema = yup.object().shape({
    find: yup.string(),
  });

  const { register, control } = useForm({
    mode: "onBlur",
    resolver: yupResolver(filmsSchema),
    shouldFocusError: true,
    criteriaMode: "all",
    reValidateMode: "onChange",
  });

  useObserver(
    elementNewPage,
    viewPage < filmState.totalPages,
    filmState.isLoading,
    () => setViewPage((value) => value + 1)
  );

  const getNewPageFilms = (isAdd) => {
    if (findQuery) {
      argFilmsByName.isAdd = isAdd;
      dispatch(getFilmsByName(argFilmsByName));
    } else {
      argPopularFilms.isAdd = isAdd;
      dispatch(getPopularFilms(argPopularFilms));
    }
  };

  useEffect(() => {
    getNewPageFilms(viewPage > 1);
  }, [viewPage, findQuery]);

  return (
    <>
      <Grid
        container
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        mt={3}
      >
        <Grid item container justifyContent="center" alignItems="center">
          <Grid item xl={6} lg={6} md={8} sm={10} xs={12}>
            <Controller
              render={({ field, formState }) => (
                <FormControl fullWidth>
                  <TextField
                    {...field}
                    {...register("find", {
                      onChange: (e) => {
                        setFindQuery(e.target.value);
                        setViewPage(1);
                      },
                    })}
                    label="Find"
                    error={!!formState.errors?.find}
                  />
                  <Box color="red">
                    {!!formState.errors?.find?.message
                      ? formState.errors.find.message
                      : null}
                  </Box>
                </FormControl>
              )}
              name="find"
              control={control}
              defaultValue={findQuery}
            />
          </Grid>
        </Grid>
        <Grid
          item
          container
          justifyContent="center"
          alignItems="center"
          rowSpacing={3}
          mt={3}
          xl={10}
          lg={10}
          md={11}
        >
          <FilmList films={filmState.films} isLoading={filmState.isLoading} />
        </Grid>
      </Grid>
      {filmState.films.length > 0 && !filmState.isLoading ? (
        <Box ref={elementNewPage} />
      ) : null}
    </>
  );
};

export default FilmsPage;
