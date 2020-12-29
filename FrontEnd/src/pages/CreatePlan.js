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

export default class CreatePlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      planName: "",
    };
  }

  render() {
    const { data } = this.state;

    return (
      <Grid className="create-cont">
        <Header />
        <Grid className="create-cont-title">
          <h2>언제가 좋을까요?🤔</h2>
        </Grid>
        <Paper className="create-paper">
          <Scheduler data={data}>
            <ViewState defaultCurrentDate="2020-12-30" />
            <MonthView />
            <Toolbar />
            <DateNavigator />
            <TodayButton />
          </Scheduler>
        </Paper>
        <input
          className="create-name"
          type="text"
          value={this.state.planName}
          onChange={(e) => {
            this.setState({ planName: e.target.value });
          }}
          placeholder="일정 이름을 작성해주세요."
        />
        {/* <div>{this.state.planName}</div> */}
        {/* 값이 잘 나오나 확인 */}
        <button type="button" className="create-plan-btn">
          일정 생성하기
          {/* <p className="create-btn-txt">일정 생성하기</p> */}
        </button>
      </Grid>
    );
  }
}
