package com.example.letsmeet.User;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import com.example.letsmeet.Meet.Meet;
import com.example.letsmeet.Time.UserInfo;

import lombok.Data;

@Data
public class User {
	@Id
	private int userKey;
	private String userId;
	private String userPass;
	private String meetId;
	
	public static boolean checkUser(UserInfo userInfo) {
		
		if(userInfo.getUser() == null || userInfo.getUser().getUserId() == null) {
			return false; //로그인 안 되어 있음. 
		}else {
			return true; 
		}
	}
	
	public static Meet getMeet(MongoTemplate mongoTemplate, String meetId) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where("meetId").is(meetId));
		return mongoTemplate.findOne(query, Meet.class);
	}
	
public static Meet getUser(MongoTemplate mongoTemplate, String Id) {
		
		Query query = new Query();
		query.addCriteria(Criteria.where("meetId").is(meetId));
		return mongoTemplate.findOne(query, Meet.class);
	}

}
