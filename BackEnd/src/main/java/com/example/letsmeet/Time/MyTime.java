package com.example.letsmeet.Time;

import com.example.letsmeet.User.User;

import lombok.Data;

@Data
public class MyTime {
	
	private User user;
	private int[] checkArray;
	private int[][] times;
}
