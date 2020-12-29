package com.letsmeet.backend;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

@Controller
public class SampleController {

	@RequestMapping(value = "/suram", method = RequestMethod.GET)
	public ResponseEntity<String> requestTest() {
		
			
		return new ResponseEntity<String>("This is suram.", HttpStatus.OK);
	}
}
