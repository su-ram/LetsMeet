import React, { useState, useRef, useCallback } from "react";
import { Container, Button } from "@material-ui/core";
import UserList from "../components/UserList";
import UserInsert from "../components/UserInsert";

const PlaceMain = () => {
  const [users, setUsers] = useState([
    {
      id: 1,
      name: "소정",
      address: "동국대",
    }, // sample
  ]); // map()을 이용하려면 배열로 적어주기

  //----------------------user을 UserList에 삽입
  const nextId = useRef(1);
  const onInsert = useCallback(
    (name, address, ipCoords) => {
      if (name.length === 0) {
        // 유저이름이 빈칸이라면 "유저3", "유저3의 현재위치" 식으로 반환
        const userslen = users.length + 1;
        name = `유저${userslen}`;
        address = `${name}의 현재 위치`;
      }
      const user = {
        name,
        address,
        id: nextId.current,
        ipCoords, //[경도, 위도]
      };
      setUsers(users.concat(user));
      nextId.current += 1; // nextId 1씩 더하기
    },
    [users]
  );

  return (
    <Container>
      <UserList users={users}></UserList>
      <UserInsert users={users} onInsert={onInsert} />
      <Button variant="contained" color="primary">
        어디서만날까?
      </Button>
    </Container>
  );
};

export default PlaceMain;
