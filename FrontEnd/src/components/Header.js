import React from "react";
import { Grid } from "@material-ui/core";
import {Link} from "react-router-dom"

const Header = () => (
  <Grid className="header-rule">
    <Grid className="header-logo">
		<a href="/Create">
			<img src="/img/letsmeet.png" alt="logo" />
		</a>
    </Grid>
    <Grid className="goto-manual">
      <a href="/Guide">사용법 바로가기</a>
    </Grid>
  </Grid>
);

export default Header;
//<Link to="/Guide" style={{ textDecoration: 'none', color: 'black' }}>사용법 바로가기</Link>

