import React from 'react';

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
        <div className="title">TOP 3</div>
        <div className="top3box">
        <text className="first">1위 </text>
        <div className="rankbox">
        <text className="desc">{timedata[0].date} {timedata[0].time} </text>
        </div>
        <text className="second">2위 </text>
        <text className="desc">{`${timedata[0].date} \n ${timedata[0].time} `}</text>
        <text className="third">3위 </text>
        <text className="desc">{`${timedata[0].date} \n ${timedata[0].time} `}</text>
        </div>
        <br />
    </div>
)
}

export default Top3;
