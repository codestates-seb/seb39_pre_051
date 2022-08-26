package com.codestates.pre51.question.dto;

//import javax.validation.constraints.NotBlank;

import jdk.jfr.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;

import javax.persistence.Column;
import java.sql.Time;
import java.time.LocalDateTime;

public class QuestionDTO {
    @Getter
    @AllArgsConstructor
    public static class Post{

        //@NotBlank

        private long question_writer_id;

        private String question_title;

        private String question_content;

    }

    @Getter
    @AllArgsConstructor
    public static class Response{
        private long question_id;
        private long question_writer_id;
        private String question_title;
        private String question_content;
        private long question_likes;
        private LocalDateTime question_created_at;
        private LocalDateTime question_modified_at;
        private long question_bestanswer_id;
        private Time question_answered_at;
    }
}
