package com.codestates.pre51.questiontag.entity;

import com.codestates.pre51.question.entity.Question;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
/*
@Entity(name="question_tag")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class QuestionTag {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_tag_id")
    private long questionTagId;

    @ManyToOne
    @JoinColumn(name="question_id")
    private Question questionId;

    @Column(nullable = false,length = 100, name="question_tag")
    private String questionTag;

}
*/