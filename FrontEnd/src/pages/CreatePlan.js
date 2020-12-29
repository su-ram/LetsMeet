import * as React from "react";
import Paper from "@material-ui/core/Paper";
import { Grid } from "@material-ui/core";
import { Header } from "../components";
import { ViewState } from "@devexpress/dx-react-scheduler";
import {
  Scheduler,
  MonthView,
  Toolbar,
  DateNavigator,
  TodayButton,
} from "@devexpress/dx-react-scheduler-material-ui";
import InputLabel from "@material-ui/core/InputLabel";
import FormControl from "@material-ui/core/FormControl";
import NativeSelect from "@material-ui/core/NativeSelect";

export default class CreatePlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      planName: "",
      startTime: "",
    };
  }

  render() {
    const { data, planName, startTime, finishTime } = this.state;
    //시작시간 배열
    const amTimes = new Array();
    for (let i = 0; i < 12; i++) {
      amTimes.push(i);
    }
    const amTimeList = amTimes.map((amTime) => (
      <option value={amTime}>오전{amTime}시</option>
    ));
    //종료시간 배열
    const pmTimes = new Array();
    for (let i = 1; i < 12; i++) {
      pmTimes.push(i);
    }
    pmTimes.unshift(12);
    const pmTimeList = pmTimes.map((pmTime) => (
      <option value={pmTime}>오후{pmTime}시</option>
    ));

    return (
      <Grid className="create-cont">
        <Header />
        <Grid className="create-cont-title">
          <h2>언제가 좋을까요?🤔</h2>
        </Grid>
        {/* 캘린더 */}
        <Paper className="create-paper">
          <Scheduler data={data}>
            <ViewState defaultCurrentDate="2020-12-30" />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Paper>
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
          <FormControl className="create-time-first">
            <InputLabel>Start Time</InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={startTime}
              onChange={(e) => {
                this.setState({ startTime: e.target.value });
              }}
            >
              <option aria-label="None" value="" />
              {amTimeList}
            </NativeSelect>
          </FormControl>
          <FormControl className="create-time-finish">
            <InputLabel>Finish Time</InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={finishTime}
              onChange={(e) => {
                this.setState({ finishTime: e.target.value });
              }}
            >
              <option aria-label="None" value="" />
              {pmTimeList}
            </NativeSelect>
          </FormControl>
        </Grid>
        <Grid>
          <FormControl className="create-interval">
            <InputLabel>Time Interval</InputLabel>
            <NativeSelect
              id="demo-customized-select-native"
              value={finishTime}
              onChange={(e) => {
                this.setState({ finishTime: e.target.value });
              }}
            >
              <option aria-label="None" value="" />
              <option value={15}>15분</option>
              <option value={30}>30분</option>
              <option value={60}>1시간</option>
            </NativeSelect>
          </FormControl>
        </Grid>
        {/* 일정생성 버튼 */}
        <button type="button" className="create-plan-btn">
          일정 생성하기
        </button>
      </Grid>
    );
  }
}
