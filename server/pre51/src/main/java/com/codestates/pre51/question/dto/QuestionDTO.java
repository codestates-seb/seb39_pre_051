package com.codestates.pre51.question.dto;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.questioncomment.entity.QuestionComment;

import com.codestates.pre51.users.entity.User;
import io.swagger.annotations.ApiModelProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

public class QuestionDTO {

    public static class Get{
        private long userId;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class Post{

        //@NotBlank

        private long questionWriterId;

        private String questionTitle;

        private String questionContent;

        private List<Answer> questionAnswers;

        private String questionTags;

    }

    @Getter
    @Setter
    @AllArgsConstructor
    @NoArgsConstructor
    public static class Patch{

        private long questionId;

        private String questionTitle;

        private String questionContent;

        private String questionTags;

    }

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class Delete{
        private long questionId;
    }

    @Getter
    @AllArgsConstructor
    @Setter
    @NoArgsConstructor
    public static class Response{
        @ApiModelProperty(value="게시글의 식별자 ID")
        private long questionId;


        private long questionWriterId;
        private User questionWriter;
        private String questionTitle;
        private String questionContent;
        private String questionTags;
        private long questionLikesCount;
        private LocalDateTime questionCreatedAt;
        private LocalDateTime questionModifiedAt;
        private long questionBestAnswerId;
        private LocalDateTime questionAnsweredAt;
        private List<QuestionComment> questionQuestionComments;
        private List<Answer> questionAnswers;
        private String usersQuestionLike;     // 토큰에 있는 사용자가 질문에 누른 좋아요 타입
        private List<String> usersAnswerLike;     // 토큰에 있는 사용자가 답변에 누른 좋아요 타입

        // 토큰에 있는 유저가 누른 question,answer 좋아요 목록
        private long likesPressedQuestionIdFromToken;
        private List<Long> likesPressedAnswersIdFromToken;
    }
}
