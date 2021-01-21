import React from "react";
import { Grid } from "@material-ui/core";
import { List } from "@material-ui/core";
import "../scss/components/_UserItem.scss";

const UserItem = ({ user }) => {
  const { name, address } = user;
  return (
    <List>
      <Grid>
        <img className="user-img" src="/img/userList.png"/>
        <Grid className="user-name">{name}</Grid>
      </Grid>
      <Grid>{address}</Grid>
    </List>
  );
};

export default UserItem;
