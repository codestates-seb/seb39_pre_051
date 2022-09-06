package com.codestates.pre51.users.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserPostDto {

    @NotBlank(message = "이름은 필 수 입력 값입니다.")
    @ApiModelProperty(value = "회원-닉네임")
    private String userName;

    @NotEmpty(message = "이메일은 필수 입력 값입니다.")
    @Email(message = "이메일 형식으로 입력해주세요.")
    @ApiModelProperty(value = "회원-이메일")
    private String userEmail;

    @NotEmpty(message = "비밀번호는 필수 입력 값입니다.")
    @Length(min = 8, max = 16, message = "비밀번호는 8자 이상, 16자 이하로 입력해주세요")
    @ApiModelProperty(value = "회원-비밀번호")
    private String userPassword;
}
