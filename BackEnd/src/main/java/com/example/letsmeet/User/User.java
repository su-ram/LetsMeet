package com.example.letsmeet.User;

import com.example.letsmeet.Time.UserInfo;

import lombok.Data;

@Data
public class User {
	
	private String userId;
	private String userPass;
	private String meetId;
	
	public static boolean checkUser(UserInfo userInfo) {
		
		if(userInfo.getUser() == null || userInfo.getUser().getUserId() == null) {
			return false; //로그인 안 되어 있음. 
		}else {
			return true; 
		}
	
	
	
	}
	

}
