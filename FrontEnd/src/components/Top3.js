import React from 'react';
import { Grid } from '@material-ui/core'
const Top3 = () => {
    //나중에 timedata 맵으로 바꿔야함
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
return (
    <div>
         <div className="title">TOP 3 <img className="img" src="/img/Top3.png" alt="top3"></img></div>
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
