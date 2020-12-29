import React, { useState, useEffect } from 'react';
import { getMonthDate, getDay, getTimeString } from '../function/getString';

import { Grid } from '@material-ui/core';
import { Table, TableBody, TableContainer, TableHead, TableRow, TableCell } from '@material-ui/core';

const TimeTable = (props) => {
	const [timeString, setTS] = useState([]);

	useEffect(()=>{
		setTS(getTimeString(props.data.start, props.data.end, props.data.gap));
	}, [props])

	return (
		<Grid className="timetable">
			<TableContainer>
				<Table className="timetable-table">
					<TableHead>
						<TableRow className="timetable-date">
							<TableCell> </TableCell>
							{
								props.data.dates.map((date, index) => 
									<TableCell key={index}>{getMonthDate(date)}</TableCell>	
								)
							}
						</TableRow>
						<TableRow className="timetable-day">
							<TableCell> </TableCell>
							{
								props.data.dates.map((date, index) => 
									<TableCell key={index}>{getDay(date)}</TableCell>	
								)
							}
						</TableRow>
					</TableHead>
					<TableBody>
						{	timeString.length!==0?
							timeString.map((t, index) =>
								<TableRow key={index} className="timetable-time">
									<TableCell className="timetable-time-string">
										<Grid>{t.substring(3,5)==props.data.start.substring(3,5)?t:undefined}</Grid>
									</TableCell>
							<TableCell> </TableCell>
							<TableCell> </TableCell>
							<TableCell> </TableCell>
							<TableCell> </TableCell>
							<TableCell> </TableCell>
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