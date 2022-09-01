package com.codestates.pre51.users.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UserResponseDto {
    @ApiModelProperty(value = "회원-식별자")
    private long memberId;

    @ApiModelProperty(value = "회원-닉네임")
    private String memberName;

    @ApiModelProperty(value = "회원-이메일")
    private String memberEmail;

    @ApiModelProperty(value = "회원-_패스워드")
    private String memberPassword;

    @ApiModelProperty(value = "회원-토큰")
    private String memberToken;

    @ApiModelProperty(value = "회원-가입날짜")
    private LocalDateTime memberCreatedAt;
}
