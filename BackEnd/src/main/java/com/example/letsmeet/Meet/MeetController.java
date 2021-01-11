package com.example.letsmeet.Meet;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.letsmeet.Time.UserInfo;
import com.example.letsmeet.User.User;
import com.google.common.hash.Hashing;

@RestController
@RequestMapping(value="/meet")
public class MeetController {

	@Resource
	private UserInfo userInfo;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	Query query; 
	
	@PostMapping
	public ResponseEntity<String> newMeet(@RequestBody Meet meet) {
		
		meet.setCreated(LocalDateTime.now());
		
		String newUrl = Hashing.sha256()
				  .hashString(meet.toString(), StandardCharsets.UTF_8)
				  .toString().substring(0,15);

		meet.setMeetId(newUrl);
		mongoTemplate.insert(meet, "meet");
		
		return new ResponseEntity<>(newUrl,HttpStatus.OK);
	}
	
	@GetMapping
	public ResponseEntity<?> getMyMeet(){
		
		if(userInfo.getUser() == null) {
			return new ResponseEntity<String>("로그인 해주세요.", HttpStatus.UNAUTHORIZED);
		}
		String meetId = userInfo.getMeetId();
		query = new Query();
		query.addCriteria(Criteria.where("meetId").is(meetId));
		
		return new ResponseEntity<Meet>(mongoTemplate.findOne(query, Meet.class, "meet"), HttpStatus.OK);
		
		
	}
	
	@PostMapping("/meetsub")
	public ResponseEntity<?> updateMeetSub(@RequestBody MeetSub meetSubInfo){
		
		if(!User.checkUser(userInfo)) {
			return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
		}
		
		String meetId = userInfo.getMeetId();
		query = new Query();
		query.addCriteria(Criteria.where("meetId").is(meetId));
		
		Update update = new Update();
		update.set("meetsub", meetSubInfo);
		mongoTemplate.updateFirst(query, update, "meet");
		
		return ResponseEntity.status(HttpStatus.OK).build();
		
		
		
		
		
		
	}
	
	
	
	
	
}
