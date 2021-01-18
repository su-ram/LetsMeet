import React, { useState } from "react";
import { Grid } from "@material-ui/core";
import { List } from "@material-ui/core";

const UserItem = ({ user }) => {
  const { name, address } = user;
  return (
    <List>
      <Grid>{name}</Grid>
      <Grid>{address}</Grid>
    </List>
  );
};

export default UserItem;
