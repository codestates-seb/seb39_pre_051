package com.codestates.pre51.question.entity;

import jdk.jfr.Timestamp;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;

@Entity(name="question")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long question_id;

    @Column(nullable = false)
    private long question_writer_id;

    @Column(nullable = false,length = 100)
    private String question_title;

    @Column(nullable = false,columnDefinition = "TEXT")
    private String question_content;

    @Column(nullable = false, columnDefinition = "INT(4) default '0'")
    private long question_likes;

    @Column(nullable = false)
    @CreatedDate
    private LocalDateTime question_created_at;

    @Column
    @LastModifiedDate
    private LocalDateTime question_modified_at;

    @Column
    private long question_bestanswer_id;

    @Column
    @Timestamp
    private Time question_answered_at;
}
