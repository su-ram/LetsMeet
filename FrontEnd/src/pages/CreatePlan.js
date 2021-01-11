import * as React from "react";
import axios from 'axios';
import { Grid } from "@material-ui/core";
import { Header } from "../components";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { DateRange } from "react-date-range";

export default class CreatePlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      planName: "",
      start: "",
      end: "",
      gap: "",
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    };
  }
  /*
  axios.post('url', {
    변수명: planName,
    변수명: startTime,
    변수명: finishTime,
    변수명: timeInterval,
    변수명: startDate,
    변수명: endDate,
    변수명: key    
  })
  .then(function (res) {
    console.log(res);
  })
  .catch(function (err) {
    console.log(err);
  });*/

  onRangeChange = (ranges) => {
    console.log(ranges);
    this.setState({
      startDate: ranges["selection"].startDate,
      endDate: ranges["selection"].endDate,
      key: ranges["selection"].key,
    });
  };

  render() {
    const { data, planName, start, end, gap } = this.state;
    // console.log(typeof gap);
    console.log(typeof gap);

    //시간 배열
    const Times = new Array();
    for (let i = 1; i < 12; i++) {
      Times.push(i);
    }
    const amTimeList = Times.map((amTime) => (
      <option value={`"${amTime}:00"`}>오전{amTime}시</option>
    ));
    const pmTimeList = Times.map((pmTime) => (
      <option value={`"${pmTime + 12}:00"`}>오후{pmTime}시</option>
    ));

    return (
      <Grid className="create-cont">
        <Header />
        <Grid className="create-cont-title">
          <h2>언제가 좋을까요?🤔</h2>
        </Grid>
        <Grid className="setting">
          {/* 캘린더 */}
          <DateRange
            className="create-calendar"
            editableDateInputs={true}
            onChange={this.onRangeChange}
            moveRangeOnFirstSelection={false}
            ranges={[this.state]}
          />
          <Grid className="create-cont-setting2">
            {/* 일정이름 */}
            <input
              className="create-name"
              type="text"
              value={planName}
              onChange={(e) => {
                this.setState({ planName: e.target.value });
              }}
              placeholder="일정 이름을 작성해주세요."
            />
            {/* 시간 정하기 */}
            <Grid className="create-time">
              <FormControl className="create-time-start">
                {/* <InputLabel className="timeText">Start Time</InputLabel> */}
                <NativeSelect
                  id="start"
                  value={start}
                  onChange={(e) => {
                    this.setState({ start: e.target.value });
                  }}
                >
                  <option aria-label="None" value="">
                    시작시간
                  </option>
                  <option value='"00:00"'>오전0시</option>
                  {amTimeList}
                  {pmTimeList}
                </NativeSelect>
              </FormControl>
              <Grid>~</Grid>
              <FormControl className="create-time-finish">
                {/* <InputLabel className="timeText">Finish Time</InputLabel> */}
                <NativeSelect
                  id="end"
                  value={end}
                  onChange={(e) => {
                    this.setState({ end: e.target.value });
                  }}
                >
                  <option aria-label="None" value="">
                    끝시간
                  </option>
                  {amTimeList}
                  <option value='"12:00"'>오후12시</option>
                  {pmTimeList}
                </NativeSelect>
              </FormControl>
            </Grid>
            <Grid className="create-gap">
              <FormControl>
                {/* <InputLabel className="timeText">Interval</InputLabel> */}
                <NativeSelect
                  id="gap"
                  value={gap}
                  onChange={(e) => {
                    this.setState({ gap: e.target.value });
                  }}
                >
                  <option aria-label="None" value="">
                    단위
                  </option>
                  <option value={15}>15분</option>
                  <option value={30}>30분</option>
                  <option value={60}>1시간</option>
                </NativeSelect>
              </FormControl>
              <Grid>&nbsp;&nbsp;단위</Grid>
            </Grid>
            {/* 일정생성 버튼 */}
            <Grid className="create-plan-btn">
              <a href="#" className="create-plan-text">
                일정 생성하기
              </a>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );
  }
}
