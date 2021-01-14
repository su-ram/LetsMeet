// 해당 id의 node가 selected 상태인지를 return
export const getBool = (str) => {
	const first_cell = document.getElementById(str);
	if(first_cell===null)
		return null;
	if(first_cell.classList.contains("not-selected")){
		console.log("false");
		return false;
	}
	console.log("true");
	return true;
}

const setStartAhead = (start, end) => {
	let s = [start[0], start[1]];
	let e = [end[0], end[1]];

	if(s[0] > e[0]){
		let tmp = s[0];
		s[0]= e[0];
		e[0] = tmp;
	}
	if(s[1] > e[1]){
		let tmp = s[1];
		s[1]= e[1];
		e[1] = tmp;
	}
	return [s, e];
}

let max_row = 0;
let max_col = 0;

export const initializeStill = async (start) => {
	// still table 초기화
	const [startStill, endStill] = await setStartAhead(start, [max_row, max_col]);

	for(let i=startStill[0]; i<=endStill[0]; i++){
		for(let j=startStill[1]; j<=endStill[1]; j++){
			const className = "stillrc"+"/"+i+"/"+j;
			const cell = document.getElementById(className);
			if(cell===null)
				continue;
			cell.classList.remove("selected");
			cell.classList.remove("not-selected");
		}
	}
	max_row = 0; max_col = 0;
}

// start부터 end까지 drag 결과(bool) 표시하기
export const showDragResult = async (bool, type, start, end) => {
	const [startPos, endPos] = await setStartAhead(start, end);

	if(end[0]>max_row)
		max_row = end[0];
	if(end[1]>max_col)
		max_col = end[1];

	let table_type = "stillrc";
	if(type)
		table_type = "rc";

	await console.log("showDragResult: "+ table_type + " " + bool+"("+start[0]+","+start[1]+")~("+end[0]+","+end[1]+")");

	for(let i=startPos[0]; i<=endPos[0]; i++){
		for(let j=startPos[1]; j<=endPos[1]; j++){
			const className = table_type+"/"+i+"/"+j;
			const cell = document.getElementById(className);
			if(cell===null)
				continue;
			if(bool){ // 체크 해지해야함
				cell.classList.remove("selected");
				cell.classList.add("not-selected");
			}else{ // 체크해야함
				cell.classList.add("selected");
				cell.classList.remove("not-selected");
			}
		}
	}
}

// 원래 표랑 똑같게 만들기
export const makeOrignal = async (start, end) => {
	console.log("makeoriginal"+"("+start[0]+","+start[1]+")~("+end[0]+","+end[1]+")");
	const [startPos, endPos] = await setStartAhead(start, end);
	console.log("makeoriginal"+"("+startPos[0]+","+startPos[1]+")~("+endPos[0]+","+endPos[1]+")");

	for(let i=startPos[0]; i<=endPos[0]; i++){
		for(let j=startPos[1]; j<=endPos[1]; j++){
			const original = "rc/"+i+"/"+j;
			const cell = document.getElementById("stillrc/"+i+"/"+j);

			if(cell===null)
				continue;
			if(getBool(original)){ // original이랑 똑같이 바꾸기
				cell.classList.add("selected");
				cell.classList.remove("not-selected");
			}else{
				cell.classList.remove("selected");
				cell.classList.add("not-selected");
			}
		}
	}
}

// still 상태일 때 drag 처리
export const stillDragging = async (bool, start, prev, now) => {
	// prev보다 now의 좌표가 더 작으면 해당 부분 original로 돌리기
	console.log("stillDragging");
	const distrow1 = prev[0]-start[0];
	const distrow2 = now[0]-start[0];
	const distcol1 = prev[1]-start[1];
	const distcol2 = now[1]-start[1];

	if(Math.abs(distrow1)<=Math.abs(distrow2)) {
		await showDragResult(bool, false, start, now);
		if(Math.abs(distcol1)>Math.abs(distcol2)){
			// 열이 더 작아졌으면
			if(distcol1<0)
				makeOrignal([Number(start[0]), Number(now[1])-1], prev);
			else
				makeOrignal([Number(start[0]), Number(now[1])+1], prev);
		}
	}else{ 
		// 행이 더 작아졌으면
		await showDragResult(bool, false, start, now);
		makeOrignal([Number(now[0])+1, Number(start[1])], prev);
		if(Math.abs(distcol1)>Math.abs(distcol2)){	// 둘다 작으면
			if(distrow1<0)
				makeOrignal([Number(now[0])-1, Number(start[1])], prev);
			else
				makeOrignal([Number(now[0])+1, Number(start[1])], prev);
		}
	}
}