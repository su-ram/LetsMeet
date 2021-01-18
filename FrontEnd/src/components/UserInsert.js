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
import ListItem from "@material-ui/core/ListItem";
import List from "@material-ui/core/List";
import ListItemText from "@material-ui/core/ListItemText";

const { kakao } = window;

const UserInsert = ({ onInsert, users }) => {
  const [dialogOpen, setdialogOpen] = useState(false);
  const [name, setName] = useState("");
  const [results, setResults] = useState([]);
  const [address, setAddress] = useState([]);

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

  //----------------------내 위치 받아오기----------------------

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

  //----------------------검색하기 위한 함수----------------------

  const handleSubmit = (e) => {
    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places();

    // 키워드로 장소를 검색합니다
    searchPlaces();

    // 키워드 검색을 요청하는 함수입니다
    function searchPlaces() {
      var keyword = document.getElementById("input-address").value;

      if (!keyword.replace(/^\s+|\s+$/g, "")) {
        alert("키워드를 입력해주세요!");
        return false;
      }

      // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
      ps.keywordSearch(keyword, placesSearchCB);
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색 완료
        getListItem(data); // List로 나타내기
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        alert("검색 결과가 존재하지 않습니다.");
        return;
      } else if (status === kakao.maps.services.Status.ERROR) {
        alert("검색 결과 중 오류가 발생했습니다.");
        return;
      }
    }
  };

  //----------------------검색 결과 주소들을 결과로 반환 -> List로 나타내기 위함----------------------

  let datas = [];
  const getListItem = (places) => {
    // console.log(places);
    datas = places;
    setResults(datas);
  };

  //----------------------유저 이름과 검색한 주소를 UserList에 삽입하기----------------------

  const handleAddressChange = (address, e) => {
    setAddress(address);

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    // 주소로 좌표를 검색합니다
    geocoder.addressSearch(address.address_name, function (result, status) {
      const coordsArray = [parseFloat(address.x), parseFloat(address.y)]; // 경도, 위도
      // 정상적으로 검색이 완료됐으면
      // if (status === kakao.maps.services.Status.OK) {
      //   var coords = new kakao.maps.LatLng(result[0].y, result[0].x); // 객체이다. 배열로 변환해주자.
      // } else {
      //   alert("주소를 정확히 입력해 주세요!");
      // }
      // const coordsArray = Object.entries(coords); // 배열로 변환
      // console.log(coordsArray);
      onInsert(name, address.place_name, coordsArray);
    });
    setdialogOpen(false);
    setName("");
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
          <Button variant="outlined" color="primary" onClick={handleSubmit}>
            장소검색
          </Button>
          {/* kakao api 주소 나타내는 영역 */}
          <List component="nav" aria-label="contacts">
            {results.map((address, i) => (
              <ListItem
                button
                onClick={(e) => handleAddressChange(address, e)} //why?
                key={i}
              >
                <ListItemText
                  primary={address.place_name}
                  secondary={address.address_name}
                />
              </ListItem>
            ))}
          </List>
        </Grid>
      </Dialog>
    </div>
  );
};

export default UserInsert;
