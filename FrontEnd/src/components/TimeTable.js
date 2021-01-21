import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import { getMonthDate, getDay, getTimeString } from '../function/getString';
import { getBool, showDragResult, initializeStill, stillDragging, calCheckArray } from '../function/timeTableFunc';

import { Grid } from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TimeTable = (props) => {
	const cellNum = 5;
	const [timeString, setTS] = useState([]);
	const [cellWidth, setCW] = useState([]);
	const [nowCell, setNC] = useState(cellNum-1); // 모바일에서 5개 보여주기

	const [dragging, setDragging] = useState(false);
	const [dragPos, setDP] = useState({"start":[-1, -1], "end":[-1, -1]});
	const [checkArray, setCA] = useState([]);
	const [dragState, setDS] = useState(false); // drag 시작점의 state
	const [update, forceUpdate] = useState(true);

	useEffect(()=>{
		setTS(getTimeString(props.data.start, props.data.end, props.data.gap));
	}, [props])

	useEffect(()=>{
		let arr = [];
		for(let i=0; i<timeString.length; i++)
			arr.push(0);
		setCA(arr);
	}, [timeString])

	useEffect(()=>{
		let tmp = [];
		for(let i=0; i<props.data.dates.length; i++)
			tmp.push(0);
		setCW(tmp);
	}, [props.dates])

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

	const startDrag = async (e) => {
		const rw = e.target.id.split("/");
		await setDragging(true);
		await setDP({"start": [rw[1], rw[2]], "end": [rw[1], rw[2]]});
		await setDS(getBool("rc/"+rw[1]+"/"+rw[2]));

		forceUpdate(!update);
	}

	const stillDrag = async (e) => {
		if(!dragging) // drag 중이 아니면
			return;
		if(e.target === undefined)
			return;
		const rw = e.target.id.split("/");
		await stillDragging(dragState, dragPos.start, dragPos.end, [rw[1], rw[2]]);
		await setDP({...dragPos, "end":[rw[1], rw[2]]});

		forceUpdate(!update);
	}

	const endDrag = async (e) => {
		const rw = e.target.id.split("/");
		await setDragging(false);
		await showDragResult(dragState, true, dragPos.start, [rw[1], rw[2]]);
		calCheckArray(dragState, dragPos.start, [rw[1], rw[2]], checkArray, props.data.dates.length)
		.then(res => {
			setCA(res);
		})
		await initializeStill(dragPos.start);
		await setDP({"start":[-1, -1], "end":[-1, -1]}); // position 초기화
		await updateToDB();

		forceUpdate(!update);
	}

	const updateToDB = async () => {
		await axios.put(`https://letsmeeet.azurewebsites.net/api/user/time`, {
			//"checkArray" : checkArray
			"userId": "user11",
			"userPass": "lovesk2",
			"meetId": "177eadfb377e863",
			"checkArray" : [1,1,3,0,0,2,0,2,0,1,1,1,1,10,1,1]
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		})
		await getGroupTime();
	}

	const getGroupTime = () => {
		console.log("get group time");
	}

	return (
		<Grid className="timetable">
			{ props.type === "mine"?
				<>
					<Grid className="timetable-title"><h2>▶ 나의 가능 시간</h2></Grid>
					<Grid className="timetable-with-arrow">
						{nowCell>4?<ArrowBackIosIcon onClick={prevCell} className="prev-btn"/>:undefined}
						<TableContainer className="timetable-table-con">
							<Table id={props.type+'table'} className="timetable-table">
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
													cellWidth.map((_, index2) => {
														let clsName = "table-body-mine";
														clsName += index2<cellNum?" visible":" unvisible";
														clsName += bool?" midterm":" fullterm";
														return (
															<TableCell key={""+index+index2} id={"rc/"+index+"/"+index2} className={clsx("not-selected","cell"+index2, clsName)}></TableCell>
														);
													})
												}
												</TableRow>
											);
										}):undefined
									}
								</TableBody>
							</Table>
							<Table className="still-table">
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
									{timeString.length!==0 &&
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
													cellWidth.map((_, index2) => {
														let clsName = "still-body-mine";
														clsName += index2<cellNum?" visible":" unvisible";
														return (
															<TableCell key={""+index+index2} id={"stillrc/"+index+"/"+index2} onMouseDown={startDrag} onMouseUp={endDrag} onMouseOver={stillDrag} className={clsx("cell"+index2, clsName)}></TableCell>
														);
													})
												}
												</TableRow>
											);
										})
									}
								</TableBody>
							</Table>
						</TableContainer>
						{nowCell<cellWidth.length-1?<ArrowForwardIosIcon onClick={nextCell} className="next-btn"/>:undefined}
					</Grid>
				</> :
				<>	
					<Grid className="timetable-title"><h2>▶ 전체 가능 시간</h2></Grid>
					<Grid className="timetable-with-arrow">
						{nowCell>4?<ArrowBackIosIcon onClick={prevCell} className="prev-btn"/>:undefined}
						<TableContainer className="timetable-table-con">
							<Table id={props.type+'table'} className="timetable-table">
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
													cellWidth.map((_, index2) => {
														let clsName = "table-body-team";
														clsName += index2<cellNum?" visible":" unvisible";
														clsName += bool?" midterm":" fullterm";
														return (
															<TableCell key={""+index+index2} id={"rc/"+index+"/"+index2} className={clsx("not-selected","cell"+index2, clsName)}></TableCell>
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
				</>
			}
		</Grid>
	)
}

export default TimeTable;