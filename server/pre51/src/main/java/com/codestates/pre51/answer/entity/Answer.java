package com.codestates.pre51.answer.entity;

import com.codestates.pre51.comment.entity.Comment;
import com.codestates.pre51.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity(name="answer")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="answer_id")
    private long answerId;

    @Column(nullable = false, name="answer_writer_id")
    private long answerWriterId;

    @Column(nullable = false, columnDefinition = "TEXT", name="answer_content")
    private String answerContent;

    @Column(nullable = false, columnDefinition = "INT(4) default '0'", name="answer_likes")
    private long answerLikes;

    @Column(nullable = false, name="answer_created_at")
    @CreatedDate
    private LocalDateTime answerCreatedAt;

    @Column(name="answer_modified_at")
    @LastModifiedDate
    private LocalDateTime answerModifiedAt;

    @ManyToOne
    @JoinColumn(name="question_id")
    @JsonIgnore
    private Question answerQuestions;

    @OneToMany(cascade = {CascadeType.ALL}, mappedBy = "commentAnswers",fetch = FetchType.EAGER)
    @JsonIgnore
    private List<Comment> answerComments = new ArrayList<>();

}
