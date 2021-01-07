package com.example.letsmeet.Meet;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data

public class Meet {
	
	private String meetId;
	private String title;
	
	/*
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(pattern = "HH:mm", timezone="Asia/Seoul")
	private LocalDateTime start;
	*/
	@JsonFormat(pattern="HH:mm")
	private String start, end;
	private LocalDateTime created;
	
	private int gap;
	private ArrayList<LocalDate> dates;
	private boolean done;

}
