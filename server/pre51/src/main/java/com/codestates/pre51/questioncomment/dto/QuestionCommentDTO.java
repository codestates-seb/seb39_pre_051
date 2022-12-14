package com.codestates.pre51.questioncomment.dto;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.users.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

public class QuestionCommentDTO {

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{
        private long questionCommentWriterId;

        private String questionCommentContent;

        private Question question;
    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{
        private long questionCommentId;
        private String questionCommentContent;

    }
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Response{
        private long questionCommentId;
        private long questionCommentWriterId;
        private User questionCommentWriter;
        private String questionCommentContent;
        private LocalDateTime questionCommentCreatedAt;
        private LocalDateTime questionCommentModifiedAt;
    }
}
