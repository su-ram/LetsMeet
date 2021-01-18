import React, {useState } from "react";
import html2canvas from 'html2canvas';
import {CLIENT_ID} from '../config';
import { Header, TimeTable, Comment, Yookha, Top3, Login, ShareModal } from "../components";
import { Grid, Button } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';
import axios from 'axios';

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
	const [shareImg, setShareImg] = useState("");
	const [open, setOpen] = useState(false);

	const copyDOM = async () => {
		window.scrollTo(0,0);

		let url = "";
		await html2canvas(document.getElementById("teamtable")).then( async (canvas) => {
			url = await canvas.toDataURL("image/jpg").split(',')[1];
			setOpen(true);
		});

		await uploadImgur(url);
	}

	const copyURL = () => {
	}

	const uploadImgur = (url) => {
		const apiBase = 'https://api.imgur.com/3/image';
		axios.post(apiBase, {
			image : url,
			type : 'base64'
		}, {
			headers: {
				Authorization: 'Client-ID ' + CLIENT_ID
			}
		})
		.then(res => {
			setShareImg(res.data.data.link);
		})
		.catch(e => {
			console.log(e);
		})
	}
  
	const handleClose = () => {
		setOpen(false);
		setShareImg("");
	};

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
						<Grid className="btn-con">
							<Button variant="contained" color="primary" onClick={copyDOM}>카카오톡 공유하기</Button>
							<Button variant="contained" color="primary" onClick={copyURL}>링크 복사하기</Button>
						</Grid>
					</Grid>
					<ShareModal 
						shareImg = {shareImg}
						open = {open}
						handleClose = {handleClose}
					/>
				</Grid>
				:undefined
			}
		</Grid>
	);
};

/*

*/
export default ManagePlan;
