import React, {useState } from "react";
import { Header, TimeTable, Comment, Yookha, Top3, Login } from "../components";
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
	const [isloggedin, setloggedin] = useState(true);
	return (
		<Grid container direction="column" className="Manage-page-con">
			<Header />
			<Grid className="Manage-plan-title"><AccessAlarmIcon fontSize="large"/><h2>{data.title}</h2></Grid>	
			{data?
				<Grid container direction="row" className="Manage-contents-con">
					{isloggedin ? <TimeTable 
						data = {data}
						type = "mine"
					/>: <Grid container direction="row" justify="center" alignItems="center">
						<Login />
					</Grid>}
					<TimeTable 
						data = {data}
						type = "team"
					/>
					<Grid justify="center" alignItems="flex-start">
						<Top3></Top3>
						<Yookha></Yookha>
						<Comment></Comment>
					</Grid>
				</Grid>
				:undefined
			}
		</Grid>
	);
};

/*

*/
export default ManagePlan;
