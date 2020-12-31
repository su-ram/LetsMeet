import React, { useState, useEffect } from 'react';
import { getMonthDate, getDay, getTimeString } from '../function/getString';

import { Grid } from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Typography } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';

const TimeTable = (props) => {
	const cellNum = 5;
	const [timeString, setTS] = useState([]);
	const [cellWidth, setCW] = useState([]);
	const [nowCell, setNC] = useState(cellNum-1); // 모바일에서 5개 보여주기

	useEffect(()=>{
		setTS(getTimeString(props.data.start, props.data.end, props.data.gap));
	}, [props])

	useEffect(()=>{
		let tmp = [];
		for(let i=0; i<props.data.dates.length; i++)
			tmp.push(0);
		setCW(tmp);
	},[props.dates])

	const removeCell = (num) => {
		const cell = document.getElementsByClassName('cell'+num);
		for(let c of cell){
			c.classList.add("unvisible");
			c.classList.remove("visible");
		}
	}

	const addCell = (num) => {
		const cell = document.getElementsByClassName('cell'+num);
		for(let c of cell){
			c.classList.add("visible");
			c.classList.remove("unvisible");
		}
	}

	const prevCell = () => {
		removeCell(nowCell);
		addCell(nowCell-cellNum);
		setNC(nowCell-1);
	}

	const nextCell = () => {
		removeCell(nowCell-cellNum+1);
		addCell(nowCell+1);
		setNC(nowCell+1);
	}

	return (
		<Grid className="timetable">
			<Grid className="timetable-title"><h2>{props.type==="mine"?"▶ 나의 가능 시간":"▶ 전체 가능 시간"}</h2></Grid>
			<Grid className="timetable-with-arrow">
				{nowCell>4?<ArrowBackIosIcon onClick={prevCell} className="prev-btn"/>:undefined}
				<TableContainer className="timetable-table-con">
					<Table className="timetable-table">
						<TableHead>
							<TableRow className="timetable-date">
								<TableCell className="blank date timetable-time-string"><Grid>____</Grid></TableCell>
								{
									props.data.dates.map((date, index) => {
										let clsName = index<cellNum?"visible":"unvisible";
										return (
											<TableCell className={clsx("date","cell"+index,clsName)} align="center" key={index}>{getMonthDate(date)}</TableCell>
										);
									})
								}
							</TableRow>
							<TableRow className="timetable-day">
								<TableCell className="blank day timetable-time-string"><Grid>____</Grid></TableCell>
								{
									props.data.dates.map((date, index) => {
										let clsName = index<cellNum?"visible":"unvisible";
										return (
											<TableCell className={clsx("day","cell"+index,clsName)} align="center" key={index}>{getDay(date)}</TableCell>
										);
									})
								}
							</TableRow>
						</TableHead>
						<TableBody>
							{timeString.length!==0?
								timeString.map((t, index) =>{
									// 첫시작과 분단위가 같거나 마지막 시간인지 확인
									const last = index===timeString.length-1;
									const bool = t.substring(3,5)===props.data.start.substring(3,5) || last;
									return(
										<TableRow key={index} className="timetable-time">
											<TableCell className="timetable-time-string">
												<Grid>{ bool? t:undefined }</Grid>
											</TableCell>
										{
											last? // 마지막 셀은 출력 x
											undefined:
											cellWidth.map((_, index) => {
												let clsName = props.type==="mine"?"table-body-mine":"table-body-team";
												clsName += index<cellNum?" visible":" unvisible";
												clsName += bool?" midterm":" fullterm";
												return (
													<TableCell key={index} className={clsx("not-selected","cell"+index, clsName)}></TableCell>
												);
											})
										}
										</TableRow>
									);
								}):undefined
							}
						</TableBody>
					</Table>
				</TableContainer>
				{nowCell<cellWidth.length-1?<ArrowForwardIosIcon onClick={nextCell} className="next-btn"/>:undefined}
			</Grid>
		</Grid>
	)
}

export default TimeTable;