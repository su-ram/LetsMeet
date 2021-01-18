package com.example.letsmeet.Time;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.letsmeet.Meet.Meet;
import com.example.letsmeet.User.User;

@RestController
@RequestMapping("/time")
public class TimeController {

	@Resource
	private UserInfo userInfo;
	
	@Autowired
	private MongoTemplate mongoTemplate;
	
	@PutMapping
	public void myTime(@RequestBody MyTime myTime) {
		
		User user = userInfo.getUser();
		
		Meet meet = user.getMeet(mongoTemplate, user.getMeetId());
		int col = myTime.getCheckArray().length;
		int row = meet.getDates().size();
		int[] checkArray = myTime.getCheckArray();
		int[][] times = new int[col][row];
		
		
		for(int i=0; i<col; i++) {
			int value = checkArray[i];
			String stringBinary = String.format("%0" + row + "d", Integer.parseInt(Integer.toBinaryString(value).toString()));
			for(int j=0; j<row; j++) {
				times[i][j] = stringBinary.charAt(j) - '0';
				
			}
			
		}
		
		myTime.setTimes(times);
		Query query = new Query();
		query.addCriteria(Criteria.where("_id").is(user.getUserKey()));
		
		Update update = new Update();
		update.set("times", times);
		
		mongoTemplate.updateFirst(query, update, "user");
		
		
		
	}
}
