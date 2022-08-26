package com.codestates.pre51.question.dto;

//import javax.validation.constraints.NotBlank;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.sql.Time;
import java.time.LocalDateTime;

public class QuestionDTO {
    @Getter
    @AllArgsConstructor
    @Setter
    public static class Post{

        //@NotBlank

        private long questionWriterId;

        private String questionTitle;

        private String questionContent;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{

        private long questionId;

        private String questionTitle;

        private String questionContent;

    }
    @Getter
    @AllArgsConstructor
    public static class Response{
        private long questionId;
        private long questionWriterId;
        private String questionTitle;
        private String questionContent;
        private long questionLikes;
        private LocalDateTime questionCreatedAt;
        private LocalDateTime questionModifiedAt;
        private long questionBestanswerId;
        private Time questionAnsweredAt;
    }
}
