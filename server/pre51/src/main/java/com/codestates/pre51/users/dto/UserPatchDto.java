package com.codestates.pre51.users.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class UserPatchDto {

    @ApiModelProperty(value = "회원-닉네임")
    private String memberName;

    @ApiModelProperty(value = "회원-패스워드")
    private String memberPassword;
}
