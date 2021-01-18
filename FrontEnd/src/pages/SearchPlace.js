import React, { useEffect } from "react";
import queryString from "query-string";
import { Grid } from "@material-ui/core";
import "../scss/pages/_SearchPlace.scss";

const { kakao } = window;

const SearchPlace = ({ location, match }) => {
  const query = queryString.parse(location.search);
  console.log(query);

  //---------------------지도 생성하기---------------------

  useEffect(() => {
    mapScript();
  }, []);

  const mapScript = () => {
    let container = document.getElementById("map");
    let options = {
      center: new kakao.maps.LatLng(
        match.params.latCenter,
        match.params.longCenter
      ),
      level: 7,
    };

    //---------------------공통 코드---------------------

    const map = new kakao.maps.Map(container, options);

    //---------------------공통 코드---------------------

    //---------------------우리가 만날 위치 텍스트로 표시---------------------

    var iwContent = '<div style="padding:5px;">우리가 만날 위치!</div>', // 인포윈도우에 표출될 내용으로 HTML 문자열이나 document element가 가능합니다
      iwPosition = new kakao.maps.LatLng(
        match.params.latCenter,
        match.params.longCenter
      ), //인포윈도우 표시 위치입니다
      iwRemoveable = true; // removeable 속성을 ture 로 설정하면 인포윈도우를 닫을 수 있는 x버튼이 표시됩니다

    // 인포윈도우를 생성하고 지도에 표시합니다
    var infowindow = new kakao.maps.InfoWindow({
      map: map, // 인포윈도우가 표시될 지도
      position: iwPosition,
      content: iwContent,
      removable: iwRemoveable,
    });
  };

  return (
    <>
      <Grid>우리 어디서 만날까? 바로 여기!</Grid>
      <Grid>
        위도는 {match.params.latCenter}, 경도는 {match.params.longCenter}
      </Grid>
      <Grid className="map_wrap">
        <Grid id="map">map here!</Grid> {/* 지도 오는 곳 */}
        <Grid className="hAddr">
          <Grid className="title">지도중심기준 행정동 주소정보</Grid>
          <Grid id="centerAddr"></Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default SearchPlace;
