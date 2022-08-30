package com.codestates.pre51.question.dto;

//import javax.validation.constraints.NotBlank;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.comment.entity.Comment;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {
    @Getter
    @AllArgsConstructor
    @Setter
    public static class Post{

        //@NotBlank

        private long questionWriterId;

        private String questionTitle;

        private String questionContent;

        private List<Answer> questionAnswers;

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
    @Setter
    public static class Delete{
        private long questionId;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    public static class Response{
        private long questionId;
        private long questionWriterId;
        private String questionTitle;
        private String questionContent;
        private long questionLikes;
        private LocalDateTime questionCreatedAt;
        private LocalDateTime questionModifiedAt;
        private long questionBestAnswerId;
        private Time questionAnsweredAt;
        private List<Comment> questionComments;
        private List<Answer> questionAnswers;
    }
}
