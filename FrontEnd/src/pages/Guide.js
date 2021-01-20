import React from 'react';
import { Button } from '@material-ui/core';

const Guide = ({ history }) => {

	const goBack = () => {
		history.goBack();
	}

    return (
        <div className="guide-con">
			<Button variant="contained" color="primary" onClick={goBack}>Go Back</Button>
            <img className="guide-img" src="/img/guide.png" />
        </div>
    )
}

    export default Guide;
