import * as React from 'react';
import Paper from '@material-ui/core/Paper';
import { ViewState } from '@devexpress/dx-react-scheduler';
import { Scheduler, MonthView, Toolbar, DateNavigator, TodayButton } from '@devexpress/dx-react-scheduler-material-ui';
import "./CreatePlan.css";

export default class CreatePlan extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    const { data } = this.state;

    return (
      <div className="create-cont">
        <h1>언제가 좋을까요?</h1>
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
            placeholder="일정 이름을 작성해주세요."/>
        <button type="button" className="create-btn"><p className="create-btn-txt">일정 생성하기</p></button>
      </div>
    );
  }
}