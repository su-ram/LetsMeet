import React, { useState, useEffect } from 'react';
import Commentitem from './Commentitem';
import axios from 'axios';

const Comment = ({match}) => {
	//const [comments, setcomments] = useState(null);
	//const [comments, setcomments] = useState(null);
	const [text, settext] = useState('');
	const onChange = (e) => {
		settext(e.target.value);
	  };
	/*useEffect(()=>{
		const headers = {
			'Access-Control-Allow-Origin': '*',        
			'Accept': 'application/json',
			'Content-Type': 'application/x-www-form-urlencoded',
			}
			axios.get(`https://letsmeeet.azurewebsites.net/5b1ea1384b0963e/api/meet`, headers)
			.then((res)=>{
				//console.log(res.data);
				setcomments(res.data);
			})
			.catch((err)=>{
			const status = err?.response?.status;
			if (status === undefined) {
				console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
			}
			else if (status === 400) {
				console.dir("400에러");
			}
			else if (status === 401) {
				console.dir("401에러");
			}
			else if (status === 500) {
				console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
			}
			});
	}, []);
	*/
	
	const handlesubmit = (e) => {
		e.preventDefault();
		//console.log(text);
		const headers = {
		  'Access-Control-Allow-Origin': '*',        
		  'Accept': 'application/json',
		  'Content-Type': 'application/x-www-form-urlencoded'
		}
	
		const data = {
		  "content": text,
		}
	
		axios
		  .post('https://letsmeeet.azurewebsites.net/api/comment', data, headers, { withCredentials: true })
		  .then(function (response) {
			console.log(response);
		  })
		  .catch(function (error) {
			console.log(error);
			const status = error?.response?.status;
			if (status === undefined) {
			  console.dir(
				"데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" +
				  JSON.stringify(error)
			  );
			} else if (status === 400) {
			  console.dir("400에러");
			} else if (status === 500) {
			  console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
			}
		  });
	  };
	

	const comments = [
		{
			"user": {
			"userId": "첫번째유저",
			"userPass": "lovesk2",
			"meetId": "5b1ea1384b0963e"
			},
			"created": "2021-01-19",
			"content": "string"
		}
	]
	return (
		<div>
			<text className="title">댓글 <img className="img" src="/img/comment.png"></img></text>
			<div className="commentbox">
				<br />
				<table className="table">
					<tbody>
						{comments.map(comment => {
							return <Commentitem key={comment.user.userId} id={comment.user.userId} name={comment.user.userId} description={comment.content} />
						})}
					</tbody>
				</table>
				<br />
				<input className="commentinput" placeholder="로그인 후 댓글을 적어주세요">
				</input>
			</div>
			<button className="btn" onChange={onChange} onClick={handlesubmit}>저장</button>
		</div>
	);
}
export default Comment;