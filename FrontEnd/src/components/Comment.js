import React, { useState, useEffect } from 'react';
import Commentitem from './Commentitem';


const Comment = () => {
    /*const [data, setdata] = useState([]);
    useEffect(({url}) => {
        console.log(url);
        const fetchComments = async () => {
          const res = await axios(
            `${match.url}/comment`
          ).then((res)=>{
            console.dir(res);
            setdata(res.data);
          })
          .catch((err)=>{ 
            console.dir(err);
            const status = err?.response?.status;
            if (status === undefined) {
              console.dir("데이터를 불러오던 중 예기치 못한 예외가 발생하였습니다.\n" + JSON.stringify(err));
            }
            else if (status === 400) {
              console.dir("400에러");
            }
            else if (status === 500) {
              console.dir("내부 서버 오류입니다. 잠시만 기다려주세요.");
            }
          });
        };
        fetchComments();
      }, []);*/
    const users = [
        {
        'id': 1,
        'name': '미현',
        'description': '디자인회의 하나씩 말씀해주세요',
        },
        {
        'id': 2,
        'name': '소정',
        'description': '넴 알겠습니다',
        },
        {
        'id': 3,
        'name': '수람',
        'description': '저희 시간 얼추 맞네요',
        },
        {
        'id': 4,
        'name': '영주',
        'description': '그러게요 다행이네요',
        },
        ]
    return(
        <div>
    <text className="title">댓글 <img className="img" src="/img/comment.png" alt="comment"></img></text>
    <div className="commentbox">
    <br/>
    <table className="table">
        <tbody>
        {users.map(user => {
        return <Commentitem key={user.id} id={user.id} name={user.name} description={user.description} />
        })}
        </tbody>
    </table>
    <br/>
    <input className="commentinput" placeholder="로그인 후 댓글을 적어주세요">
    </input>
    </div>
    <br></br>
    <button className="sharebtn">링크 복사하기</button>
    <button className="sharebtn">카카오톡 공유하기</button>
    
    </div>
    );
}
export default Comment;