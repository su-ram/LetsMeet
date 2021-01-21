import React, { useEffect } from "react";
import queryString from "query-string";
import { Grid } from "@material-ui/core";
import "../scss/pages/_SearchPlace.scss";
import { Header } from "../components";

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

    //---------------------지도 클릭하면 주소 마커 표시---------------------

    // 주소-좌표 변환 객체를 생성합니다
    var geocoder = new kakao.maps.services.Geocoder();

    var marker = new kakao.maps.Marker(), // 클릭한 위치를 표시할 마커입니다
      infowindow = new kakao.maps.InfoWindow({ zindex: 1 }); // 클릭한 위치에 대한 주소를 표시할 인포윈도우입니다

    // 현재 지도 중심좌표로 주소를 검색해서 지도 좌측 상단에 표시합니다
    searchAddrFromCoords(map.getCenter(), displayCenterInfo);

    // 지도를 클릭했을 때 클릭 위치 좌표에 대한 주소정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "click", function (mouseEvent) {
      searchDetailAddrFromCoords(mouseEvent.latLng, function (result, status) {
        if (status === kakao.maps.services.Status.OK) {
          var detailAddr = !!result[0].road_address
            ? "<div>도로명주소 : " +
              result[0].road_address.address_name +
              "</div>"
            : "";
          detailAddr +=
            "<div>지번 주소 : " + result[0].address.address_name + "</div>";

          var content =
            '<div class="bAddr">' +
            '<span class="address-popup-title">법정동 주소정보</span>' +
            detailAddr +
            "</div>";

          // 마커를 클릭한 위치에 표시합니다
          marker.setPosition(mouseEvent.latLng);
          marker.setMap(map);

          // 인포윈도우에 클릭한 위치에 대한 법정동 상세 주소정보를 표시합니다
          infowindow.setContent(content);
          infowindow.open(map, marker);
        }
      });
    });
    // 중심 좌표나 확대 수준이 변경됐을 때 지도 중심 좌표에 대한 주소 정보를 표시하도록 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", function () {
      searchAddrFromCoords(map.getCenter(), displayCenterInfo);
    });

    function searchAddrFromCoords(coords, callback) {
      // 좌표로 행정동 주소 정보를 요청합니다
      geocoder.coord2RegionCode(coords.getLng(), coords.getLat(), callback);
    }

    function searchDetailAddrFromCoords(coords, callback) {
      // 좌표로 법정동 상세 주소 정보를 요청합니다
      geocoder.coord2Address(coords.getLng(), coords.getLat(), callback);
    }

    // 지도 좌측상단에 지도 중심좌표에 대한 주소정보를 표출하는 함수입니다
    function displayCenterInfo(result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var infoDiv = document.getElementById("centerAddr");

        for (var i = 0; i < result.length; i++) {
          // 행정동의 region_type 값은 'H' 이므로
          if (result[i].region_type === "H") {
            infoDiv.innerHTML = result[i].address_name;
            break;
          }
        }
      }
    }
    //---------------------카테고리 별로 지도에 나타내기
    // 마커를 클릭했을 때 해당 장소의 상세정보를 보여줄 커스텀오버레이입니다
    var placeOverlay = new kakao.maps.CustomOverlay({ zIndex: 1 }),
      contentNode = document.createElement("div"), // 커스텀 오버레이의 컨텐츠 엘리먼트 입니다
      markers = [], // 마커를 담을 배열입니다
      currCategory = ""; // 현재 선택된 카테고리를 가지고 있을 변수입니다

    // 장소 검색 객체를 생성합니다
    var ps = new kakao.maps.services.Places(map);

    // 지도에 idle 이벤트를 등록합니다
    kakao.maps.event.addListener(map, "idle", searchPlaces);

    // 커스텀 오버레이의 컨텐츠 노드에 css class를 추가합니다
    contentNode.className = "placeinfo_wrap";

    // 커스텀 오버레이의 컨텐츠 노드에 mousedown, touchstart 이벤트가 발생했을때
    // 지도 객체에 이벤트가 전달되지 않도록 이벤트 핸들러로 kakao.maps.event.preventMap 메소드를 등록합니다
    addEventHandle(contentNode, "mousedown", kakao.maps.event.preventMap);
    addEventHandle(contentNode, "touchstart", kakao.maps.event.preventMap);

    // 커스텀 오버레이 컨텐츠를 설정합니다
    placeOverlay.setContent(contentNode);

    // 각 카테고리에 클릭 이벤트를 등록합니다
    addCategoryClickEvent();

    // 엘리먼트에 이벤트 핸들러를 등록하는 함수입니다
    function addEventHandle(target, type, callback) {
      if (target.addEventListener) {
        target.addEventListener(type, callback);
      } else {
        target.attachEvent("on" + type, callback);
      }
    }

    // 카테고리 검색을 요청하는 함수입니다
    function searchPlaces() {
      if (!currCategory) {
        return;
      }

      // 커스텀 오버레이를 숨깁니다
      placeOverlay.setMap(null);

      // 지도에 표시되고 있는 마커를 제거합니다
      removeMarker();

      ps.categorySearch(currCategory, placesSearchCB, { useMapBounds: true });
    }

    // 장소검색이 완료됐을 때 호출되는 콜백함수 입니다
    function placesSearchCB(data, status, pagination) {
      if (status === kakao.maps.services.Status.OK) {
        // 정상적으로 검색이 완료됐으면 지도에 마커를 표출합니다
        displayPlaces(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        // 검색결과가 없는경우 해야할 처리가 있다면 이곳에 작성해 주세요
      } else if (status === kakao.maps.services.Status.ERROR) {
        // 에러로 인해 검색결과가 나오지 않은 경우 해야할 처리가 있다면 이곳에 작성해 주세요
      }
    }

    // 지도에 마커를 표출하는 함수입니다
    function displayPlaces(places) {
      // 몇번째 카테고리가 선택되어 있는지 얻어옵니다
      // 이 순서는 스프라이트 이미지에서의 위치를 계산하는데 사용됩니다
      var order = document
        .getElementById(currCategory)
        .getAttribute("data-order");

      for (var i = 0; i < places.length; i++) {
        // 마커를 생성하고 지도에 표시합니다
        var marker = addMarker(
          new kakao.maps.LatLng(places[i].y, places[i].x),
          order
        );

        // 마커와 검색결과 항목을 클릭 했을 때
        // 장소정보를 표출하도록 클릭 이벤트를 등록합니다
        (function (marker, place) {
          kakao.maps.event.addListener(marker, "click", function () {
            displayPlaceInfo(place);
          });
        })(marker, places[i]);
      }
    }

    // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
    function addMarker(position, order) {
      var imageSrc =
          "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/places_category.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
        imageSize = new kakao.maps.Size(27, 28), // 마커 이미지의 크기
        imgOptions = {
          spriteSize: new kakao.maps.Size(72, 208), // 스프라이트 이미지의 크기
          spriteOrigin: new kakao.maps.Point(46, order * 36), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
          offset: new kakao.maps.Point(11, 28), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
        },
        markerImage = new kakao.maps.MarkerImage(
          imageSrc,
          imageSize,
          imgOptions
        ),
        marker = new kakao.maps.Marker({
          position: position, // 마커의 위치
          image: markerImage,
        });

      marker.setMap(map); // 지도 위에 마커를 표출합니다
      markers.push(marker); // 배열에 생성된 마커를 추가합니다

      return marker;
    }

    // 지도 위에 표시되고 있는 마커를 모두 제거합니다
    function removeMarker() {
      for (var i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
    }

    // 클릭한 마커에 대한 장소 상세정보를 커스텀 오버레이로 표시하는 함수입니다
    function displayPlaceInfo(place) {
      var content =
        '<div class="placeinfo">' +
        '   <a class="title" href="' +
        place.place_url +
        '" target="_blank" title="' +
        place.place_name +
        '">' +
        place.place_name +
        "</a>";

      if (place.road_address_name) {
        content +=
          '    <span title="' +
          place.road_address_name +
          '">' +
          place.road_address_name +
          "</span>" +
          '  <span class="jibun" title="' +
          place.address_name +
          '">(지번 : ' +
          place.address_name +
          ")</span>";
      } else {
        content +=
          '    <span title="' +
          place.address_name +
          '">' +
          place.address_name +
          "</span>";
      }

      content +=
        '    <span class="tel">' +
        place.phone +
        "</span>" +
        "</div>" +
        '<div class="after"></div>';

      contentNode.innerHTML = content;
      placeOverlay.setPosition(new kakao.maps.LatLng(place.y, place.x));
      placeOverlay.setMap(map);
    }

    // 각 카테고리에 클릭 이벤트를 등록합니다
    function addCategoryClickEvent() {
      var category = document.getElementById("category"),
        children = category.children;

      for (var i = 0; i < children.length; i++) {
        children[i].onclick = onClickCategory;
      }
    }

    // 카테고리를 클릭했을 때 호출되는 함수입니다
    function onClickCategory() {
      var id = this.id,
        className = this.className;

      placeOverlay.setMap(null);

      if (className === "on") {
        currCategory = "";
        changeCategoryClass();
        removeMarker();
      } else {
        currCategory = id;
        changeCategoryClass(this);
        searchPlaces();
      }
    }

    // 클릭된 카테고리에만 클릭된 스타일을 적용하는 함수입니다
    function changeCategoryClass(el) {
      var category = document.getElementById("category"),
        children = category.children,
        i;

      for (i = 0; i < children.length; i++) {
        children[i].className = "";
      }

      if (el) {
        el.className = "on";
      }
    }
  };

  return (
    <>
      <Header/>
      <Grid className="map-title">우리 어디서 만날까? 바로 여기!📍</Grid>
      {/* <Grid>
        위도는 {match.params.latCenter}, 경도는 {match.params.longCenter}
      </Grid> */}
      <Grid className="map_wrap">
        <Grid id="map">map here!</Grid> {/* 지도 오는 곳 */}
        <Grid className="hAddr">
          <Grid className="address-title">지도중심기준 행정동 주소정보</Grid>
          <Grid id="centerAddr"></Grid>
        </Grid>
        <ul id="category">
          <li id="FD6" data-order="0">
            <span class="category_bg bank"></span>
            음식점
          </li>
          <li id="CT1" data-order="1">
            <span class="category_bg mart"></span>
            문화시설
          </li>
          <li id="PM9" data-order="2">
            <span class="category_bg pharmacy"></span>
            약국
          </li>
          <li id="SW8" data-order="3">
            <span class="category_bg oil"></span>
            지하철
          </li>
          <li id="CE7" data-order="4">
            <span class="category_bg cafe"></span>
            카페
          </li>
          <li id="CS2" data-order="5">
            <span class="category_bg store"></span>
            편의점
          </li>
        </ul>
      </Grid>
    </>
  );
};

export default SearchPlace;
