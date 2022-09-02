package com.codestates.pre51.answerlikes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
@Setter
public class AnswerLikesDTO {

    private long answerLikesId;
    private long answerLikesAnswerId;
    private long answerLikedPresserId;

}
