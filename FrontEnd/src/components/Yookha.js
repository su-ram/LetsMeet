import React, { useState } from 'react';
import "./Yookha.css";
const Yookha=()=> {
    const [yookha, setyookha] = useState({
        who: '',
        when: '',
        where: '',
        what: '',
        how: '',
        why: '',
      });
      const { who, when, where, what, how, why } = yookha;

    const onChange = (e) => {
        const { value, name } = e.target;
        setyookha({
      ...yookha,
      [name]: value
    });
      };
  return (
    <div>
    <text className="title">육하원칙</text>
    <br/>
    <br/>
    <div className="flex-container">
        
    <div className="inputbox">
    <text className="subtitle">누구랑?</text>
    <input className="input" name="who" placeholder="?누구랑" dir="rtl" onChange={onChange} value={who} />
    <hr color="lightblue" size="3px" align="left"></hr>
    </div>
    

    <div className="inputbox">
    <text className="subtitle">언제?</text>
    <input className="input" name="when" placeholder="?언제" dir="rtl" onChange={onChange} value={when} />
    <hr color="lightblue" size="3px" align="left"></hr>
    </div>
    

    <div className="inputbox">
    <text className="subtitle">어디서?</text>
    <input className="input" name="where" placeholder="?어디서" dir="rtl" onChange={onChange} value={where} />
    <hr color="lightblue" size="3px" align="left"></hr>
    </div>

    <div className="inputbox">
    <text className="subtitle">무엇을?</text>
    <input className="input" name="what" placeholder="?무엇을" dir="rtl" onChange={onChange} value={what} />
    <hr color="lightblue" size="3px" align="left"></hr>
    </div>

    <div className="inputbox">
    <text className="subtitle">어떻게?</text>
    <input className="input" name="how" placeholder="?어떻게" dir="rtl" onChange={onChange} value={how} />
    <hr color="lightblue" size="3px" align="left"></hr>
    </div>

    <div className="inputbox">
    <text className="subtitle">왜?</text>
    <input className="input" name="why" placeholder="?왜" dir="rtl" onChange={onChange} value={why} />
    <hr color="lightblue" size="3px" align="left"></hr>
    </div>
    </div>
      <button>저장</button>
    </div>
  );
}

export default Yookha;

//input --> float:right