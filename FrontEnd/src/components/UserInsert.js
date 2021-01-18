import React, { useState } from "react";
import {
  Button,
  Typography,
  Grid,
  InputBase,
  IconButton,
  Dialog,
  TextField,
} from "@material-ui/core";

const { kakao } = window;

const UserInsert = ({ onInsert, users }) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [name, setName] = useState("");

  // 장소 추가 버튼 누르면 Dialog open
  const handleClickOpen = () => {
    setdialogOpen(true);
  };

  // Dialog close
  const handleClose = () => {
    setdialogOpen(false);
  };

  // textfield 이름 변경
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  //----------------------내 위치 받아오기
  const handleMyPosition = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const longitude = position.coords.longitude; // 경도
        const latitude = position.coords.latitude; // 위도
        const positionArray = [longitude, latitude]; //경도,위도
        // var locPosition = new kakao.maps.LatLng(latitude, longitude); // 좌표값으로 변환 -> 객체이다
        // console.log(Object.entries(locPosition));
        // console.log(locPosition.La);
        // const positionArray = Object.entries(locPosition); // 배열로 변환
        const addList = {
          name,
          positionArray,
        };
        console.log(positionArray);
        onInsert(name, "", positionArray);
        setdialogOpen(false);
        setName("");
      });
    } else {
      alert("Geolocation is not supported by your browser");
    }
  };

  //----------------------검색하기 위한 버튼
  const handleSubmit = () => {
    console.log("검색기능");
  };

  return (
    <div>
      <Button variant="outlined" color="primary" onClick={handleClickOpen}>
        장소 선택하기
      </Button>
      <Dialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={dialogOpen}
      >
        <Grid onSubmit={handleSubmit}>
          <TextField
            id="outlined-dense"
            label="나의 이름"
            value={name}
            onChange={handleNameChange}
            margin="dense"
            variant="outlined"
          />
          <IconButton aria-label="Directions" onClick={handleMyPosition}>
            <Typography variant="body2" color="primary">
              내 위치
            </Typography>
          </IconButton>
          <InputBase
            id="input-address"
            placeholder="어디서 출발할거야?"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                handleSubmit();
              }
            }}
          />
        </Grid>
      </Dialog>
    </div>
  );
};

export default UserInsert;
