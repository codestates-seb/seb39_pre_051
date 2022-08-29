package com.codestates.pre51.question.entity;

import com.codestates.pre51.answer.entity.Answer;
import jdk.jfr.Timestamp;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.sql.Time;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

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
    @Column(name="question_id")
    private long questionId;

    @Column(nullable = false, name="question_writer_id")
    private long questionWriterId;

    @Column(nullable = false,length = 100, name="question_title")
    private String questionTitle;

    @Column(nullable = false, columnDefinition = "TEXT", name="question_content")
    private String questionContent;

    @Column(nullable = false, columnDefinition = "INT(4) default '0'", name="question_likes")
    private long questionLikes;

    @Column(nullable = false, name="question_created_at")
    @CreatedDate
    private LocalDateTime questionCreatedAt;

    @Column(name="question_modified_at")
    @LastModifiedDate
    private LocalDateTime questionModifiedAt;

    @Column(name="question_best_answer_id")
    private long questionBestAnswerId;

    @Column(name="question_answered_at")
    @Timestamp
    private Time questionAnsweredAt;

    @OneToMany(mappedBy = "answerQuestions")
    private List<Answer> questionAnswers = new ArrayList<>();
}
