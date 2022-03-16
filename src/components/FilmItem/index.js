import React from "react";
import { Box, Grid, Typography } from "@mui/material";
import { getImageUrl } from "../../services/api/films";

const FilmItem = ({ film }) => {
  return (
    <Grid
      container
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Grid item>
        <Typography variant="h5">{film.title ?? "No title" }</Typography>
      </Grid>
      <Grid item>
        <Box
          component="img"
          alt={film.title}
          src={getImageUrl(film.poster_path)}
        />
      </Grid>
      <Grid item>
        <Typography variant="h6">({film.release_date ?? "No date"})</Typography>
      </Grid>
    </Grid>
  );
};

export default FilmItem;