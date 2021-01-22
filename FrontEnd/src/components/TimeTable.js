import React, { useState, useEffect, createRef } from 'react';
import clsx from 'clsx';
import axios from 'axios';

import { getMonthDate, getDay, getTimeString } from '../function/getString';
import { getBool, showDragResult, initializeStill, stillDragging, calCheckArray, getCheckArray } from '../function/timeTableFunc';

import { Grid } from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell, Tooltip, Button } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';

const TimeTable = (props) => {

	const cellNum = 5;
	const [timeString, setTS] = useState([]);
	const [cellWidth, setCW] = useState([]);
	const [nowCell, setNC] = useState(cellNum-1); // 모바일에서 5개 보여주기

	const [dragging, setDragging] = useState(false);
	const [dragPos, setDP] = useState({"start":[-1, -1], "end":[-1, -1]});
	const [checkArray, setCA] = useState();
	const [checkGroup, setCG] = useState();
	const [user, setUser] = useState();
	const [userLength, setUL] = useState();
	const [dragState, setDS] = useState(false); // drag 시작점의 state
	const [update, forceUpdate] = useState(true);

	const tooltipRef = createRef();

	useEffect(()=>{
		setTS(getTimeString(props.data.start, props.data.end, props.data.gap));
		setCA(props.data.userTime);
		setCG(props.data.checkArray);
		setUser(props.user);
		setUL(props.data.num);
		forceUpdate(!props.update);
	}, [props])

	useEffect(()=>{
		let arr = [];
		for(let i=0; i<timeString.length-1; i++){
			let tmp = [];
			for(let j=0; j<cellWidth.length; j++){
				tmp.push(0);
			}
			arr.push(tmp);
		}
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
		calCheckArray(dragState, dragPos.start, [rw[1], rw[2]], checkArray)
		.then(res => {
			setCA(res);
		})
		await initializeStill(dragPos.start);
		await setDP({"start":[-1, -1], "end":[-1, -1]}); // position 초기화
		await updateToDB();

		forceUpdate(!update);
	}

	const updateToDB = async () => {
		const CA = getCheckArray(checkArray);
		console.log(CA);
		await axios.put(`https://letsmeeet.azurewebsites.net/api/time`, {
			"userId": "user11",
			"userPass": "lovesk2",
			"meetId": "177eadfb377e863",
			"checkArray" : CA
		}, {
			headers: {
				'Access-Control-Allow-Origin': '*'
			}
		})
		.then(res => {
			setCG(res.data.checkArray);
			setCA(res.data.userTime);
			console.log(res.data.checkArray);
			console.log(res.data.userTime);
		})
		.catch(err => {
			console.log(err);
		})

		await props.forceUpdate(!update);
	}

	const deleteAll = () => {
		axios.delete(`https://letsmeeet.azurewebsites.net/api/time`)
		.then(res => {
			console.log(res);
		})
		.catch(err => {
			console.log(err);
		})
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
											const bool = t.split(":")[1]===props.data.start.split(":")[1] || last;
											return(
												<TableRow key={index} className="timetable-time">
													<TableCell className="timetable-time-string">
														<Grid>{ bool? t:undefined }</Grid>
													</TableCell>
												{
													last && checkArray ? // 마지막 셀은 출력 x
													undefined:
													cellWidth.map((_, index2) => {
														let clsName = "table-body-mine";
														clsName += index2<cellNum?" visible":" unvisible";
														clsName += bool?" fullterm":" midterm";
														if(checkArray === null || checkArray.length === 0)
															clsName += " not-selected";
														else{
															clsName += checkArray[index][index2]===1? " selected" : " not-selected";
														};
														return (
															<TableCell key={""+index+index2} id={"rc/"+index+"/"+index2} className={clsx("cell"+index2, clsName)}></TableCell>
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
											const bool = t.split(":")[1]===props.data.start.split(":")[1] || last;
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
					<Grid className="table-footer-con">
						<Grid className="mine-footer">
							<Grid className="color-box impossible"> </Grid>
							<p>불가능</p>
						</Grid>
						<Grid className="mine-footer">
							<Grid className="color-box possible"> </Grid>
							<p>가능</p>
						</Grid>
						<Grid>
							<Button variant="contained" color="primary" onClick={deleteAll}>전체 삭제</Button>
						</Grid>
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
									{timeString.length!==0 && checkGroup && userLength !== undefined?
										timeString.map((t, index) =>{
											// 첫시작과 분단위가 같거나 마지막 시간인지 확인
											const last = index===timeString.length-1;
											const bool = t.split(":")[1]===props.data.start.split(":")[1] || last;
											return(
												<TableRow key={index} className="timetable-time">
													<TableCell className="timetable-time-string">
														<Grid>{ bool && t }</Grid>
													</TableCell>
													{
														!last && 
														cellWidth.map((_, index2) => {
															let clsName = "table-body-team";
															clsName += bool?" fullterm":" midterm";

															let arrNum = 0;
															let numStr = checkGroup[index].toString(userLength);
															const diff = cellWidth.length-numStr.length;
															if(index2>=diff){
																arrNum = Number(numStr[index2-diff]);
															}

															// 선택한 유저 수 별 색상 표현
															const defaultNum = userLength/5;
															let bgColor = "";
															if(arrNum===0){
																bgColor = "";
															}else if(defaultNum>arrNum){
																bgColor = " bg1";
															}else if(defaultNum*2>arrNum){
																bgColor = " bg2";
															}else if(defaultNum*3>arrNum){
																bgColor = " bg3";
															}else if(userLength>arrNum){
																bgColor = " bg4";
															}
															clsName += bgColor;

															// tooltip content
															const ttContent = 
																<div className="ttcontent">
																	<p>가능 : {arrNum} / {userLength}</p>
																	<p>불가능 : {userLength-arrNum} / {userLength}</p>
																</div>;

															return (
																<Tooltip title={ttContent} ref={tooltipRef} arrow>
																	<TableCell key={""+index+index2} id={"rc/"+index+"/"+index2} className={clsx("cell"+index2, clsName)}> </TableCell>
																</Tooltip>
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
					<Grid className="table-footer-con">
						<Grid>0% 가능</Grid>
						<Grid className="color-box-con">
							<Grid className="color-box"> </Grid>
							<Grid className="color-box bg1"> </Grid>
							<Grid className="color-box bg2"> </Grid>
							<Grid className="color-box bg3"> </Grid>
							<Grid className="color-box bg4"> </Grid>
						</Grid>
						<Grid>100% 가능</Grid>
					</Grid>
				</>
			}
		</Grid>
	)
}

export default TimeTable;