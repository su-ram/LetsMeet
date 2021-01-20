package com.example.letsmeet.Meet;

import java.time.LocalDate;
import java.util.ArrayList;

import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@Data
public class MeetSub {

	private ArrayList<String> who; 
	private String when; 
	private String why;
	private String what;
	private String where;
	private String how; 
	
	
	MeetSub(ArrayList<LocalDate> dates){
		
		
		LocalDate date = dates.get(0);
		int index = dates.size() - 1;
		String startDate = String.valueOf(date.getMonthValue())+"/"+String.valueOf(date.getDayOfMonth());
		date = dates.get(index);
		String endDate = String.valueOf(date.getMonthValue())+"/"+String.valueOf(date.getDayOfMonth());
		
		
		this.when = startDate + " ~ " + endDate;
		this.who = new ArrayList<String>();
		
		
	}
	
	public void addUser(String name) {
		who.add(name);
	}
	
	
	
	
	
}
