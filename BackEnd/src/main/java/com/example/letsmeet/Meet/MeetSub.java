package com.example.letsmeet.Meet;

import java.time.LocalDate;

import lombok.Data;

@Data
public class MeetSub {

	private String[] who; 
	private LocalDate when; 
	private String why;
	private String what;
	private String where;
	private String how; 
}
