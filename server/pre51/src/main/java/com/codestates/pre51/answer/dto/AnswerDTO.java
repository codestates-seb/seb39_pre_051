package com.codestates.pre51.answer.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

public class AnswerDTO {
    @Getter
    @Setter
    public static class Post{

        private long answerWriterId;

        private String answerContent;

        private long answerQuestionId;

    }
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long answerId;
        private long answerWriterId;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Patch{
        private long answerId;
        private String content;
    }
}
