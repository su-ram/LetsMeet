package com.example.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/meet")
public class MeetController {

	@GetMapping
	public Object getMeet() {
		return "getMeet";
	}
}
