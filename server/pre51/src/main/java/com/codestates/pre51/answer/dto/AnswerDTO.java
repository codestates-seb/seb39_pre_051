package com.codestates.pre51.answer.dto;

import com.codestates.pre51.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class AnswerDTO {
    @Getter
    @Setter
    public static class Post{

        private long answerWriterId;

        private String answerContent;

        //private long answerQuestionId;
        private Question question;

    }
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long answerId;
        private long answerWriterId;
        private String answerContent;
        private long answerLikes;
        private LocalDateTime answerCreatedAt;
        private LocalDateTime answerModifiedAt;
        //private long answerQuestionId;
        private Question question;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Patch{
        private long answerId;
        private String content;
    }
}
