package com.example.letsmeet.Meet;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;

import org.springframework.data.annotation.Id;
import org.springframework.format.annotation.DateTimeFormat;

import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.Data;

@Data

public class Meet {
	
	@Id
	private String meetId;
	
	private String title;
	
	/*
	@DateTimeFormat(pattern = "HH:mm")
	@JsonFormat(pattern = "HH:mm", timezone="Asia/Seoul")
	private LocalDateTime start;
	*/
	@JsonFormat(pattern="HH:mm")
	private String start, end;
	private LocalDateTime atTime;
	
	
	private int gap;
	private ArrayList<Date> dates;
	private boolean done;

}
