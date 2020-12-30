package com.letsmeet.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
@RequestMapping(value="/meet")
public class MeetController {
	
	@RequestMapping(method = RequestMethod.GET)
	public ResponseEntity<String> requestTest() {
		
			
		return new ResponseEntity<String>("get meet info.", HttpStatus.OK);
	}

}
