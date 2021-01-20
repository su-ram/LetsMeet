import React from 'react';
import { Grid } from '@material-ui/core'
import axios from 'axios';
const Top3 = () => {
    //나중에 timedata 맵으로 바꿔야함,,안바꿔도될듯??
    const timedata = [
        {
        'date': '12/15(수)',
        'time': '2:30PM~4:30PM',
        },
        {
        'date': '12/18(금)',
        'time': '4PM~6PM',
        },
        {
        'date': '12/18(금)',
        'time': '3PM~4PM',
        },
        ]

    	/*useEffect(()=>{
		const headers = {
			'Access-Control-Allow-Origin': '*',        
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			}
			axios.get(`https://letsmeeet.azurewebsites.net/5b1ea1384b0963e/api/topN`, headers)
			.then((res)=>{
				//console.log(res.data);
				setcomments(res.data);
			})
			.catch((err)=>{
			const status = err?.response?.status;
			if (status === undefined) {
				console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
			}
			else if (status === 400) {
				console.dir("400에러");
			}
			else if (status === 401) {
				console.dir("401에러");
			}
			else if (status === 500) {
				console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
			}
			});
	}, []);
	*/
return (
    <div>
         <div className="title">TOP 3 <img className="img" alt='top3' src="/img/Top3.png"></img></div>
        <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="center">
        <Grid>
        <text className="first">1위 </text>
        </Grid>
        <Grid>
        <text className="desc">{timedata[0].date} </text>
        <br/>
        <text className="desc">{timedata[0].time} </text>
        </Grid>
        <Grid>
        <text className="second">2위 </text>
        </Grid>
        <Grid>
        <text className="desc">{timedata[1].date} </text>
        <br/>
        <text className="desc">{timedata[1].time} </text>
        </Grid>
        <Grid>
        <text className="third">3위 </text>
        </Grid>
        <Grid>
        <text className="desc">{timedata[1].date} </text>
        <br/>
        <text className="desc">{timedata[1].time} </text>
        </Grid>
        </Grid>
        <br />
    </div>
)
}

export default Top3;
