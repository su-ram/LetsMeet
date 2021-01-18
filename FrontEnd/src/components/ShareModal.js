import React, { useEffect } from 'react';

import { Grid, Button, Modal, Fade } from '@material-ui/core';

const ShareModal = (props) => {
	const kakaoShare = () => {
		window.Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
			  title: "Let's Meet(렛츠 밋)",
			  description: "팀 일정 결정 및 공유 사이트",
			  imageUrl:	'https://i.ibb.co/PzQGXjD/shareImg.png',
				//https://i.ibb.co/bPb0PQy/letsmeet.png
			  link: {
				webUrl: 'http://localhost:3000/2',
			  },
			},
			buttons: [
			  {
				title: '일정 보러 가기',
				link: {
				  webUrl: 'http://localhost:3000/2',
				},
			  },
			]
		});
	}

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
					<Button className="share-btn" onClick={kakaoShare}>Share</Button>
				</Grid>
			</Fade>
		</Modal>
	);
};

export default ShareModal;