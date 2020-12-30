import * as React from "react";
import { Grid } from "@material-ui/core";
import { Header } from "../components";
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range';

export default class CreatePlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      planName: "",
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    };
  }

  onRangeChange = (ranges) => {
    console.log(ranges);
    this.setState({
      startDate:ranges['selection'].startDate,
      endDate:ranges['selection'].endDate,
      key:ranges['selection'].key,
    });
  }

  render() {
    const { data } = this.state;

    return (
      <Grid className="create-cont">
        <Header />
        <Grid className="create-cont-title">
          <h2>언제가 좋을까요?🤔</h2>
        </Grid>
        <DateRange
          editableDateInputs={true}
          onChange={this.onRangeChange}
          moveRangeOnFirstSelection={false}
          ranges={[this.state]}
        />
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
