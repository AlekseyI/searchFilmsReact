import React from "react";
import { Grid } from "@mui/material";
import FilmItem from "../FilmItem";
import ErrorPage from "../../pages/error";

const FilmList = ({ films, isLoading }) => {
  return (
    <>
      {films && films.length > 0 ? (
        films.map((film) => (
          <Grid key={film.id} item xl={3} lg={4} md={5} xs={12}>
            <FilmItem film={film} />
          </Grid>
        ))
      ) : (
          !isLoading ?
        <ErrorPage>
          <h1>Films not found</h1>
        </ErrorPage> : null
      )}
    </>
  );
};

export default FilmList;
