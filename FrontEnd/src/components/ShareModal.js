import React, { useEffect } from 'react';

import { Grid, Button, Modal, Fade } from '@material-ui/core';

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
					{props.shareImg?
						<Grid className="share-img-con">
							<img src={props.shareImg} alt="share img"/>
							<Button variant="contained" color="primary" onClick={kakaoShare}>Share</Button>
						</Grid>
						:<Grid className="share-des">이미지를 불러오는 중입니다. 잠시만 기다려주세요!</Grid>
					}
				</Grid>
			</Fade>
		</Modal>
	);
};

export default ShareModal;