package com.codestates.pre51.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class QuestionAndAnswerDTO<T> {
    private List<T> question;

    private List<T> answer;


}
