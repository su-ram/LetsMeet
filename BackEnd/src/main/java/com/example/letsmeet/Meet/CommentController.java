package com.example.letsmeet.Meet;

import java.time.LocalDateTime;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.letsmeet.Api.ApiMessage;
import com.example.letsmeet.Time.UserInfo;
import com.example.letsmeet.User.User;

@RestController
@RequestMapping("/comment")
public class CommentController {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	private User user;
	private ResponseEntity response;
	
	@Resource
	private UserInfo userInfo;
	
	@PostMapping
	public ResponseEntity<Void> newComment(@RequestBody Comment comment) {
		//댓글 생성 api. 
		
		user = userInfo.getUser();
		
		comment.setCreated(LocalDateTime.now());
		comment.setUser(userInfo.getUser());
		
		if(user != null && user.getUserId() != null) {
			mongoTemplate.insert(comment, "comment");
			response = ResponseEntity.status(HttpStatus.OK).build();
			
			
		}else {
			//로그인 필요함. 
			response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		return response;
		
		
	}
}
