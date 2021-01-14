import React from 'react';

import { Grid, Button, Modal, Fade } from '@material-ui/core'

const ShareModal = (props) => {
	return(
		<Modal 
			className="share-modal"
			open={props.open}
			onClose={props.handleClose}
		>
        	<Fade in={props.open}>
				<Grid className="modal-con">
					<Grid className="modal-header">
						<h2>이미지 공유</h2>
						<Button onClick={props.handleClose}>X</Button>
					</Grid>
					<img src={props.shareImg} alt="share img"/>
				</Grid>
			</Fade>
		</Modal>
	);
};

export default ShareModal;