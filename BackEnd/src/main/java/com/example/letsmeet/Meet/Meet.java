package com.example.letsmeet.Meet;

import java.util.ArrayList;

import lombok.Data;

@Data
public class Meet {
	
	private int meetId;
	private String title;
	private String startTime;
	private String endTime;
	private int gap;
	private ArrayList<?> dates;
	private boolean done;

}
