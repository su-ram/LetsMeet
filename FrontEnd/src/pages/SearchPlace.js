import React from "react";
import queryString from "query-string";
import { Grid } from "@material-ui/core";
import "../scss/pages/_SearchPlace.scss";

const SearchPlace = ({ location, match }) => {
  const query = queryString.parse(location.search);
  console.log(query);

  return (
    <Grid>
      위도는 {match.params.latCenter}, 경도는 {match.params.longCenter}
    </Grid>
  );
};

export default SearchPlace;
