package com.codestates.pre51.comment.dto;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

public class CommentDTO {

    @Getter
    @Setter
    @AllArgsConstructor
    public static class Post{
        private long commentWriterId;

        private String commentContent;

        private Question question;

        private Answer answer;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Patch{
        private long commentId;
        private String commentContent;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    public static class Response{
        private long commentId;
        private long commentWriterId;
        private String commentContent;
        private LocalDateTime commentCreatedAt;
        private LocalDateTime commentModifiedAt;

    }

}
