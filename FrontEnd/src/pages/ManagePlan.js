import React, {useState } from "react";
import { Header, TimeTable } from "../components";
import { Grid } from '@material-ui/core'
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const getData = (url) => {
	// 원래 url을 이용해서 해당 정보 받아오기
	return ({
		"title" : "비주얼 팀 회의",
		"dates" : [
			new Date("2020/12/14"),
			new Date("2020/12/15"),
			new Date("2020/12/16"),
			new Date("2020/12/17"),
			new Date("2020/12/18"),
			new Date("2020/12/19"),
			new Date("2020/12/20"),
			new Date("2020/12/21"),
			new Date("2020/12/22"),
		],
		"gap" : 30,
		"start" : "10:00",
		"end" : "23:50"
	})
}

const ManagePlan = ({match}) => {
	const [data, setData] = useState(getData(match.url));

	return (
		<Grid className="Manage-page-con">
			<Header />
			{data?
				<Grid className="Manage-contents-con">
					<Grid className="Manage-plan-title"><AccessAlarmIcon fontSize="large"/><h2>{data.title}</h2></Grid>	
					<TimeTable data = {data}/>
				</Grid>
				:undefined
			}
		</Grid>
	);
};

export default ManagePlan;
