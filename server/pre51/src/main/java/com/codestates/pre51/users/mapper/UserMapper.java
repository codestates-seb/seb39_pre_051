package com.codestates.pre51.users.mapper;

import com.codestates.pre51.users.dto.UserPatchDto;
import com.codestates.pre51.users.dto.UserPostDto;
import com.codestates.pre51.users.dto.UserResponseDto;
import com.codestates.pre51.users.entity.User;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;

@Component
public class UserMapper {

    public User userPostDtoToUser(UserPostDto userPostDto) {
        return new User(0L,
                userPostDto.getMemberName(),
                userPostDto.getMemberEmail(),
                userPostDto.getMemberPassword(),
                null,
                LocalDateTime.now());
    }

    public User userPatchDtoToUser(UserPatchDto userPatchDto) {
        return new User(0L,
                userPatchDto.getMemberName(),
                null,
                userPatchDto.getMemberPassword(),
                null,
                LocalDateTime.now());
    }

    public UserResponseDto memberToMemberResponseDto(User user) {
        return new UserResponseDto(user.getMemberId(),
                user.getMemberName(),
                user.getMemberEmail(),
                user.getMemberPassword(),
                null,
                user.getMemberCreatedAt());
    }
}
