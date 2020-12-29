package com.example.backend.Controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/comment")
public class CommentController {

	
	@GetMapping
	public Object getComment() {
		return "getComment";
	}
	
	@PostMapping
	public Object postComment() {
		return "postComment";
	}
}
