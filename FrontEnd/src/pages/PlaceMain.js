import React, { useState, useRef, useCallback } from "react";
import { Container, Button } from "@material-ui/core";
import UserList from "../components/UserList";

const PlaceMain = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "소정",
      address: "동국대",
    },
  ]); // map()을 이용하려면 배열로 적어주기

  return (
    <Container>
      <UserList users={users}></UserList>
      <Button variant="contained" color="primary">
        어디서만날까?
      </Button>
    </Container>
  );
};

export default PlaceMain;
