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
