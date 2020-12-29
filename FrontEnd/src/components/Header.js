import React from "react";
import { Grid } from "@material-ui/core";

const Header = () => (
  <Grid className="header-rule">
    <Grid className="header-logo">
      <img src="/img/letsmeet.png" alt="logo" />
    </Grid>
    <Grid className="goto-manual">
      <a href="#">사용법 바로가기</a>
    </Grid>
  </Grid>
);

export default Header;
