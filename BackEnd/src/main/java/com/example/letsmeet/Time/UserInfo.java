package com.example.letsmeet.Time;

import java.io.Serializable;
import java.time.LocalDate;
import java.util.ArrayList;

import org.springframework.context.annotation.Scope;
import org.springframework.context.annotation.ScopedProxyMode;
import org.springframework.stereotype.Component;
import org.springframework.web.context.WebApplicationContext;

import com.example.letsmeet.User.User;

import lombok.Data;

@Component
@Data
@Scope(value = WebApplicationContext.SCOPE_SESSION, proxyMode = ScopedProxyMode.TARGET_CLASS)
public class UserInfo implements Serializable{
	
	private User user;
	private String meetId;
	private int gap; 
	private ArrayList<LocalDate> dates;
	private ArrayList<Integer> timetables;
	

}
