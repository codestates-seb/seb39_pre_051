package com.codestates.pre51.users.dto;

import io.swagger.annotations.ApiModelProperty;
import lombok.*;

@Data
@AllArgsConstructor
@Getter
@Setter
@NoArgsConstructor
public class UserGetDto {
    @ApiModelProperty(value = "회원-식별자")
    private long userId;
}
