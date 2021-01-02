package com.example.letsmeet.User;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/user")
public class UserController {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	
	@PostMapping
	public ResponseEntity<?> newUser(@RequestBody User newbie) {
		
		mongoTemplate.insert(newbie, "user");
		
		return new ResponseEntity<>(newbie.toString(), HttpStatus.OK);
		
	}
	
	public void getUser() {
		
	}
	
	
}
