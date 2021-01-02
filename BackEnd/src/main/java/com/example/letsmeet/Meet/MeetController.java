package com.example.letsmeet.Meet;

import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.google.common.hash.Hashing;

@RestController
@RequestMapping(value="/meet")
public class MeetController {

	@Autowired
	private MongoTemplate mongoTemplate;
	
	@PostMapping
	public ResponseEntity<String> newMeet(@RequestBody Meet meet) {
		
		meet.setAtTime(LocalDateTime.now());
		
		String newUrl = Hashing.sha256()
				  .hashString(meet.toString(), StandardCharsets.UTF_8)
				  .toString().substring(0,15);

		meet.setMeetId(newUrl);
		mongoTemplate.insert(meet, "meet");
		
		
		return new ResponseEntity<>(newUrl,HttpStatus.OK);
	}
}
