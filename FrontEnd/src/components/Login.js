import React, { useState } from 'react';
const Login=()=> {
    const [logininput, setlogininput] = useState({
        id: '',
        pw: '',
      });
    const { id, pw } = logininput;

    const onChange = (e) => {
        const { value, name } = e.target;
        setlogininput({
      ...logininput,
      [name]: value
    });
      };
  return (
    <div className="login-flex-container">
    <text className="title"><img className="img" src="/img/alarm.png"></img>    비주얼팀 디자인 회의</text>
    <br/>
    <br/>
    <div>
    <text className="nickname">닉네임 : </text>
    <input className="logininput" name="id" onChange={onChange} value={id} />
    </div>
    <br></br>
    <div>
    <text className="nickname">비밀번호 : </text>
    <input className="logininput" name="pw" onChange={onChange} value={pw} />
    </div>
    <br></br>
    <text className="notice">*닉네임과 비밀번호는 현재 일정에만 사용됩니다.</text>
    <br></br>
      <button className="btn">로그인</button>
    </div>
  );
}

export default Login;

//input --> float:right