export const getMonthDate = (date) => {
	const d = new Date(date);
	return (d.getMonth()+1)+"/"+d.getDate();
}

export const getDay = (date) => {
	const d = new Date(date);
	const dayString = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];
	return dayString[d.getDay()];
}

export const getTimeString = (start, end, gap) => {
	if(start === undefined || end === undefined || gap === undefined)
		return [];

	let TSArray = [start];
	let now = [Number(start.split(":")[0]), Number(start.split(":")[1])];
	const endTime = [Number(end.split(":")[0]), Number(end.split(":")[1])];

	while(true){
		let hour = now[0]; let minute = now[1];
		minute += gap;
		if(minute>=60){
			hour+=1;
			minute-=60;
		}
		if(!isTimeBefore(hour, minute, endTime[0], endTime[1]))
			break;
		now = [hour, minute];

		TSArray.push(now[0]+":"+(now[1]<10?("0"+now[1]):now[1]));
	}
	TSArray.push(end);

	return TSArray;
}

const isTimeBefore = (h1, m1, h2, m2) => {
	if(h1<h2)
		return true;
	else if(h1===h2){
		if(m1<m2)
			return true;
		else
			return false;
	}else
		return false;
}