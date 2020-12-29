import React, { useState, useEffect } from 'react';
import { getMonthDate, getDay, getTimeString } from '../function/getString';

import { Grid } from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';
import clsx from 'clsx';

const TimeTable = (props) => {
	const [timeString, setTS] = useState([]);
	const [cellWidth, setCW] = useState([]);

	useEffect(()=>{
		setTS(getTimeString(props.data.start, props.data.end, props.data.gap));
	}, [props])

	useEffect(()=>{
		let tmp = [];
		for(let i=0; i<props.data.dates.length; i++)
			tmp.push(0);
		setCW(tmp);
	},[props.dates])

	return (
		<Grid className="timetable">
			<TableContainer>
				<Table className="timetable-table">
					<TableHead>
						<TableRow className="timetable-date">
							<TableCell className="blank">__</TableCell>
							{
								props.data.dates.map((date, index) => 
									<TableCell className="date" align="center" key={index}>{getMonthDate(date)}</TableCell>	
								)
							}
						</TableRow>
						<TableRow className="timetable-day">
							<TableCell className="blank">__</TableCell>
							{
								props.data.dates.map((date, index) => 
									<TableCell className="day" align="center" key={index}>{getDay(date)}</TableCell>	
								)
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{	timeString.length!==0?
							timeString.map((t, index) =>
								<TableRow key={index} className="timetable-time">
									<TableCell className="timetable-time-string">
										<Grid>{
											t.substring(3,5)===props.data.start.substring(3,5) || index===timeString.length-1
											? t:undefined
										}</Grid>
									</TableCell>
								{
									cellWidth.map((_, index) =>
										<TableCell key={index} className={clsx("table-body","not-selected")}></TableCell>
									)
								}
								</TableRow>
							):undefined
						}
					</TableBody>
				</Table>
			</TableContainer>
		</Grid>
	)
}

export default TimeTable;