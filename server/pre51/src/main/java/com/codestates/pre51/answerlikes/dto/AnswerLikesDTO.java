package com.codestates.pre51.answerlikes.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@AllArgsConstructor
@NoArgsConstructor
@Setter
public class AnswerLikesDTO {

    private long answerLikesId;
    private long answerLikesAnswerId;
    private long answerLikesPresserId;

}
