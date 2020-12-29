import React, { useState, useEffect } from 'react';
import { getMonthDate, getDay, getTimeString } from '../function/getString';

import { Grid } from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import clsx from 'clsx';

const TimeTable = (props) => {
	const [timeString, setTS] = useState([]);
	const [cellWidth, setCW] = useState([]);
	const [nowCell, setNC] = useState(6); // 모바일에서 7개 보여주기

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
		addCell(nowCell-7);
		setNC(nowCell-1);
	}

	const nextCell = () => {
		removeCell(nowCell-6);
		addCell(nowCell+1);
		setNC(nowCell+1);
	}

	return (
		<Grid className="timetable">
			<TableContainer className="timetable-table-con">
				<Table className="timetable-table">
					<TableHead>
						<TableRow className="timetable-date">
							<TableCell className="blank date">____</TableCell>
							{
								props.data.dates.map((date, index) => {
									let clsName = "visible";
									if(index>=7)
										clsName="unvisible";
									return (
										<TableCell className={clsx("date","cell"+index,clsName)} align="center" key={index}>{getMonthDate(date)}</TableCell>
									);
								})
							}
						</TableRow>
						<TableRow className="timetable-day">
							<TableCell className="blank day">____</TableCell>
							{
								props.data.dates.map((date, index) => {
									let clsName = "visible";
									if(index>=7)
										clsName="unvisible";
									return (
										<TableCell className={clsx("day","cell"+index,clsName)} align="center" key={index}>{getDay(date)}</TableCell>
									);
								})
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{timeString.length!==0?
							timeString.map((t, index) =>
								<TableRow key={index} className="timetable-time">
									<TableCell className="timetable-time-string">
										<Grid>{
											t.substring(3,5)===props.data.start.substring(3,5) || index===timeString.length-1
											? t:undefined
										}</Grid>
									</TableCell>
								{
									cellWidth.map((_, index) =>{
										let clsName = "visible";
										if(index>=7)
											clsName="unvisible";
										return (
											<TableCell key={index} className={clsx("table-body","not-selected","cell"+index, clsName)}></TableCell>
										);
									})
								}
								</TableRow>
							):undefined
						}
					</TableBody>
				</Table>
			</TableContainer>
			{nowCell>6?<ArrowBackIosIcon onClick={prevCell} className="prev-btn"/>:undefined}
			{nowCell<cellWidth.length-1?<ArrowForwardIosIcon onClick={nextCell} className="next-btn"/>:undefined}
		</Grid>
	)
}

export default TimeTable;