package com.example.letsmeet.Meet;

import java.time.LocalDateTime;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
		//이미 있으면 수정, 없으면 새로 생성. 
		
		user = userInfo.getUser();
		
		comment.setCreated(LocalDateTime.now());
		comment.setUser(userInfo.getUser());
		
		Query query = new Query();
		query.addCriteria(Criteria.where("user").is(user));
		Comment cmt = mongoTemplate.findOne(query, Comment.class, "comment");
		
		if(user != null && user.getUserId() != null) {
			//로그인 문제 없음. 
			
			if(cmt == null) { 
				mongoTemplate.insert(comment, "comment");
				
			}
			else {
				mongoTemplate.findAndReplace(query, comment, "comment");
			}
			
			
			response = ResponseEntity.status(HttpStatus.OK).build();
			
			
		}else {
			//로그인 필요함. 
			response = ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		return response;
		
		
	}
	
	@GetMapping
	public List<Comment> getMeets(){
		//해당하는 약속에 있는 모든 댓글들을 불러옴. 
		
		
		Query query = new Query();
		query.addCriteria(Criteria.where("user.meetId").is(userInfo.getMeetId()));
		return mongoTemplate.find(query, Comment.class, "comment");
	}
}
