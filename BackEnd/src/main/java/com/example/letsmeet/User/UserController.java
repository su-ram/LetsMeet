package com.example.letsmeet.User;

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

import com.example.letsmeet.Meet.Meet;
import com.example.letsmeet.Time.UserTime;

@RestController
@RequestMapping(value="/user")
public class UserController {

	@Resource
	private UserTime userTime;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	private Meet queryMeet;
	private String message;
	private HttpStatus status;
	
	@PostMapping("signin")
	public ResponseEntity<?> newUser(@RequestBody User newbie) {
		
		//유저 검증. 
		
		switch(checkUser(newbie)) {
			case 0 :
				
				return new ResponseEntity<>("해당 링크가 존재하지 않습니다.", HttpStatus.BAD_REQUEST);
		
			case 1 :
				
				mongoTemplate.insert(newbie,"user");
				message = "아이디 생성 완료.";
				status = HttpStatus.CREATED;
				break;
			
			case 2 :
				
				message = "비밀번호가 일치하지 않습니다.";
				status = HttpStatus.UNAUTHORIZED;
				break;
				
			case 3 :
				
				message = "로그인 성공.";
				status = HttpStatus.OK;
				break;
		}
		
		
		
		userTime.setMeetId(queryMeet.getMeetId());
		userTime.setGap(queryMeet.getGap());
		userTime.setDates(queryMeet.getDates());
		
		
				
		return new ResponseEntity<String>(message, status);
		
	}
	
	public int checkUser(User user) {
		
		
		Query query = new Query();
		query.addCriteria(Criteria.where("meetId").is(user.getMeetId()));
		
		queryMeet = mongoTemplate.findOne(query, Meet.class, "meet");
		
		if(queryMeet==null) return 0;
		
		query.addCriteria(Criteria.where("userId").is(user.getUserId()));

		User queryUser = mongoTemplate.findOne(query, User.class, "user");
		
		if(queryUser == null ) return 1;
		
		query.addCriteria(Criteria.where("userPass").is(user.getUserPass()));
		
		queryUser = mongoTemplate.findOne(query, User.class, "user");
		
		if(queryUser == null) return 2;
		
		return 3;
		
	}
	
	@GetMapping("session")
	public String get() {
		return userTime.toString();
	}
	
	
}
