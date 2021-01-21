import React from 'react';
import { Link } from "react-router-dom";
import Button from '@material-ui/core/Button';
const Findmidplace = () => {

return (
    <div>
         <div className="title">중간지점 찾기 
         <img className="img" alt='top3' src="/img/top3.png"></img>
         <span className="midbtn">
		 <Link to="/Place">
         	<Button variant="contained" color="primary" >어디서 만날까?</Button>
		</Link>
         </span>
         </div>
    </div>
)
}

export default Findmidplace;
