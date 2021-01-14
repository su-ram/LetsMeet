package com.letsmeet.backend;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoOperations;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.letsmeet.backend.VO.User;
import com.mongodb.Mongo;
import com.mongodb.MongoClient;
import com.mongodb.client.MongoClients;

@Controller
@RequestMapping(value="/user")
public class UserController {
	
	@Autowired
	private MongoTemplate mongo;
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> getUser(){
		
		
		User user = new User("suram", "password");
		mongo.insert(user);
				
		
		return new ResponseEntity<String>("getUser", HttpStatus.OK);
	}

}
