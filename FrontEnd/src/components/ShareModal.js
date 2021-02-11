import React, { useEffect } from 'react';

import { Grid, Button, Modal, Fade } from '@material-ui/core';

import { KAKAO_KEY } from '../config';

const ShareModal = (props) => {

	const kakaoShare = () => {
		props &&
		window.Kakao.Link.sendDefault({
			objectType: 'feed',
			content: {
			  title: "Let's Meet(렛츠 밋)",
			  description: "팀 일정 결정 및 공유 사이트",
			  imageUrl:	props.shareImg,
			  link: {
				webUrl: window.location.href,
			  },
			},
			buttons: [
			  {
				title: '일정 보러 가기',
				link: {
				  webUrl: window.location.href,
				},
			  },
			]
		});
	}

	useEffect(() => {
		console.log(window.Kakao);
		window.Kakao.init(KAKAO_KEY);
		window.Kakao.isInitialized();
	}, []);

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
						<Grid className="share-img-con">
							<img src={props.shareImg} alt="share img"/>
							<Button variant="contained" color="primary" onClick={kakaoShare}>Share</Button>
						</Grid>
				</Grid>
			</Fade>
		</Modal>
	);
};

export default ShareModal;