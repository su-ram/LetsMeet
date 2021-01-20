import React from "react";
import { Grid } from "@material-ui/core";
import UserItem from "./UserItem";

const UserList = ({ users }) => {
  return (
    <Grid className="UserList">
      {users.map((user) => (
        <UserItem user={user} key={user.id}></UserItem>
      ))}
    </Grid>
  );
};

export default UserList;
