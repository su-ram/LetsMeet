package com.example.letsmeet.Meet;

import java.time.LocalDateTime;

import com.example.letsmeet.User.User;

import lombok.Data;

@Data
public class Comment {

	private String cmtId;
	private User user;
	private String content;
	private LocalDateTime created;
}
