import React from 'react';
import Button from '@material-ui/core/Button';
const Findmidplace = () => {

const goToPlace = () => {
    window.open('/Place');
};

return (
    <div>
         <div className="title">중간지점 찾기 
         <img className="img" alt='top3' src="/img/top3.png"></img>
         <span className="midbtn">
         <Button variant="contained" color="primary" onClick={goToPlace}>어디서 만날까?</Button>
         </span>
         </div>
    </div>
)
}

export default Findmidplace;
