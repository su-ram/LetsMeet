import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { List } from "@material-ui/core";
import FaceTwoToneIcon from "@material-ui/icons/FaceTwoTone";

const UserItem = ({ user }) => {
  const { name, address } = user;
  return (
    <List>
      <Grid>
        <FaceTwoToneIcon />
        {name}
      </Grid>
      <Grid>{address}</Grid>
    </List>
  );
};

export default UserItem;
