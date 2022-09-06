package com.codestates.pre51.answer.dto;

import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.users.entity.User;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class AnswerDTO {
    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Post{

        private long answerWriterId;

        private String answerContent;

        private Question question;

        private List<QuestionComment> answerQuestionComments;

    }

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class Patch{
        private long answerId;
        private String answerContent;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class Response{
        private long answerId;
        private long answerWriterId;
        private User answerWriter;
        private String answerContent;
        private long answerLikesCount;
        private LocalDateTime answerCreatedAt;
        private LocalDateTime answerModifiedAt;
        private List<AnswerComment> answerAnswerComments;
    }
}
