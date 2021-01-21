import React, { useState, useRef, useCallback } from "react";
import { Container, Button, Grid } from "@material-ui/core";
import UserList from "../components/UserList";
import UserInsert from "../components/UserInsert";
import PlaceIcon from "@material-ui/icons/Place";
import { Header } from "../components";
import "../scss/pages/_PlaceMain.scss";

const PlaceMain = ({ history }) => {
  //장소 api에서 title(planName) 받아와야함
  const title = "비주얼팀";
  const [users, setUsers] = useState([
    // sample
    // {
    //   id: 1,
    //   name: "소정",
    //   address: "동국대",
    // },
  ]); // map()을 이용하려면 배열로 적어주기

  //----------------------user을 UserList에 삽입----------------------

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

  //----------------------가운데 지점 찾기----------------------

  // 사실은 circumcenter을 사용해야 하지만 일단 centroid을 사용 -> 야매.....
  const searchCenter = () => {
    if (users.length > 1) {
      let longSum = 0;
      let latSum = 0;
      var usersLong = users.map((user) => user.ipCoords[0]); // map은 배열로 저장한다ㅠㅠㅠㅠ
      var usersLat = users.map((user) => user.ipCoords[1]); // 위도를 배열로 저장하기
      for (let i = 0; i < users.length; i++) {
        // 위도, 경도 각각 sum 구하기
        longSum += usersLong[i];
        latSum += usersLat[i];
      }
      let longCenter = longSum / users.length;
      let latCenter = latSum / users.length;
      history.push(`/SearchPlace/${longCenter}/${latCenter}`); //경도, 위도 -> queryString으로 데이터 넘겨주기
    } else {
      alert("두 명 이상의 친구가 필요해요!");
    }
  };

  return (
    <Container>
      <Header/>
      <Grid className="place-main-title">⏰  {title} 디자인 회의</Grid>
      <Grid className="place-mid-title">중간지점 찾기 📍</Grid>
      <Grid className="place-cont">
        <Grid className="place-left-cont">
          <Grid className="place-user-list">
            {
              users==""?
                <Grid className="place-user-none">
                  아직 아무도 위치를 등록하지 않았어요.<br/>
                  위치를 등록해주세요!
                </Grid>
                :<UserList users={users}/>
            }
          </Grid>
        </Grid>
        <Grid className="place-right-cont">
          <Grid className="place-my-place">
            <img className="place-img-my" src="/img/myPlace.jpg"/>
            <UserInsert users={users} onInsert={onInsert} />
            <Grid className="place-my-title">
              출발 할 현재 내 위치를 등록하고,<br/>
              서로의 위치를 공유하면서<br/>
              약속 장소를 정해보세요.
            </Grid>
          </Grid>
          <Grid className="place-our-mid">
            <img className="place-img-mid" src="/img/middlePlace.png"/>
            <Button variant="contained" color="primary" onClick={searchCenter}>
              <PlaceIcon></PlaceIcon>중간지점 보기
            </Button>
            <Grid className="place-our-title">
              각자 입력하신 위치를 기반으로 하여,<br/>
              최적의 약속 장소를 정하기 위한<br/>
              중간 지점을 알려드려요.
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceMain;
