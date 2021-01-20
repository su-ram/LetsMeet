import React, { useState } from "react";
import html2canvas from 'html2canvas';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { CLIENT_ID } from '../config';
import axios from 'axios';


import { Header, TimeTable, Comment, Yookha, Top3, ShareModal, Findmidplace } from "../components";

import { Grid, Button } from '@material-ui/core';
import AccessAlarmIcon from '@material-ui/icons/AccessAlarm';

const getData = (url) => {
	// 원래 url을 이용해서 해당 정보 받아오기
	return ({
		"title": "2021 신년 모임",
		"start": "13:00",
		"end": "21:00",
		"gap": 30,
		"dates": [
			"2020-12-31",
			"2021-01-03"
		]
	})
}

const ManagePlan = ({ match }) => {
	const [data, setData] = useState(getData(match.url));
	const [shareImg, setShareImg] = useState("");
	const [open, setOpen] = useState(false);
	
	const [isloggedin, setloggedin] = useState(false);
	const [logininput, setlogininput] = useState({
		id: '',
		pw: '',
	});
	const { id, pw } = logininput;
	const onChange = (e) => {
		const { value, name } = e.target;
		setlogininput({
			...logininput,
			[name]: value
		});
	};

	const onLogin = (e) => {
		if (id === '' || pw === '') {
			alert('닉네임과 패스워드를 입력해주세요');
		}
		else {
			const data = {
				"userId": logininput.id,
				"userPass": logininput.pw,
				"meetId": window.location.href.split('/')[3]
			}
			axios.post(`https://letsmeeet.azurewebsites.net/api/user/signin`, data)
				.then((res) => {
					console.log(res);
					setloggedin(true);
				})
				.catch((err) => {
					const status = err?.response?.status;
					console.log(err);
					if (status === undefined) {
						console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
					}
					else if (status === 400) {
						alert("");
						console.dir("400에러");
					}
					else if (status === 404) {
						alert("404");
						console.dir("404에러");
					}
					else if (status === 500) {
						console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
					}
				});

		}
	};

	const copyDOM = async () => {
		window.scrollTo(0, 0);

		let url = "";
		await html2canvas(document.getElementById("teamtable")).then(async (canvas) => {
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
			image: url,
			type: 'base64'
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
			{isloggedin && <Grid className="Manage-plan-title"><AccessAlarmIcon fontSize="large" /><h2>{data.title}</h2></Grid>}
			{data &&
				<Grid container direction="row" className="Manage-contents-con">
					{isloggedin ? <TimeTable
						data={data}
						type="mine"
					/> : <Grid container direction="row" justify="center" alignItems="center" className="login-con">
							<div className="login-flex-container">
								<div className="title">
									<img className="img" src="/img/alarm.png" />
									<p>{data.title}</p>
								</div>
								<div className="form-con">
									<div>
										<text className="nickname">닉네임 : </text>
										<input className="logininput" name="id" onChange={onChange} value={id} />
									</div>
									<div>
										<text className="nickname">비밀번호 : </text>
										<input className="logininput" name="pw" onChange={onChange} value={pw} />
									</div>
								</div>
								<div className="extra-con">
									<text className="notice">*닉네임과 비밀번호는 현재 일정에만 사용됩니다.</text>
									<button onClick={onLogin} className="btn">로그인</button>
								</div>
							</div>
						</Grid>}
					<TimeTable
						data={data}
						type="team"
					/>
					<Grid container direction="column" justify="flex-start" alignItems="stretch">
						<Top3></Top3>
						<Yookha></Yookha>
						<br></br>
						<Findmidplace></Findmidplace>
						<br></br>
						<Comment></Comment>
						<Grid className="btn-con">
							<Button variant="contained" color="primary" onClick={copyDOM}>카카오톡 공유하기</Button>
							<CopyToClipboard text={window.location.href} onCopy={() => window.alert("링크가 복사되었습니다.")}>
								<Button variant="contained" color="primary" onClick={copyURL}>링크 복사하기</Button>
							</CopyToClipboard>
						</Grid>
					</Grid>
					<ShareModal
						shareImg={shareImg}
						open={open}
						handleClose={handleClose}
					/>
				</Grid>
			}
		</Grid>
	);
};

export default ManagePlan;
