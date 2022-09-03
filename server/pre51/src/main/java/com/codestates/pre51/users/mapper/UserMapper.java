package com.codestates.pre51.users.mapper;

import com.codestates.pre51.users.dto.UserPatchDto;
import com.codestates.pre51.users.dto.UserPostDto;
import com.codestates.pre51.users.dto.UserResponseDto;
import com.codestates.pre51.users.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.ArrayList;

@Component
public class UserMapper {

    public User userPostDtoToUser(UserPostDto userPostDto) {
        return new User(0L,
                userPostDto.getUserName(),
                userPostDto.getUserEmail(),
                userPostDto.getUserPassword(),
                LocalDateTime.now(),
                     "ROLE_USER",
                new ArrayList<>(){});
    }

    public User userPatchDtoToUser(UserPatchDto userPatchDto) {
        return new User(0L,
                userPatchDto.getUserName(),
                null,
                userPatchDto.getUserPassword(),
                LocalDateTime.now(),
                "ROLE_USER",
                new ArrayList<>(){});
    }

    public UserResponseDto userToUserResponseDto(User user) {
        return new UserResponseDto(user.getUserId(),
                user.getUserName(),
                user.getUserEmail(),
                user.getUserPassword(),
                null,
                user.getUserCreatedAt());
    }
}
