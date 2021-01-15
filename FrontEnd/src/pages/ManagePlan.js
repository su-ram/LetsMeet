import React, { useState } from "react";
import { Header, TimeTable, Comment, Yookha, Top3} from "../components";
import { Grid } from '@material-ui/core'
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
		if(id==='' || pw===''){
			alert('닉네임과 패스워드를 입력해주세요');
		}
		else{
			/*axios.post(`${match.url}/user/signin`, logininput)
            .then((res) => {
                console.log(res);
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
            else if (status === 500) {
                console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
            }
            });*/
			setloggedin(true);
		}
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
							<div className="login-flex-container">
								<text className="title"><img className="img" src="/img/alarm.png"></img>    비주얼팀 디자인 회의</text>
									<br/><br/>
									<div>
									<text className="nickname">닉네임 : </text>
									<input className="logininput" name="id" onChange={onChange} value={id} />
									</div>
									<br></br>
									<div>
									<text className="nickname">비밀번호 : </text>
									<input className="logininput" name="pw" onChange={onChange} value={pw} />
									</div>
									<br></br>
									<text className="notice">*닉네임과 비밀번호는 현재 일정에만 사용됩니다.</text>
									<br></br>
									<button onClick={onLogin} className="btn">로그인</button>
							</div>
					</Grid>}
					<TimeTable 
						data = {data}
						type = "team"
					/>
					<Grid container direction="column" justify="flex-start" alignItems="stretch">						
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
