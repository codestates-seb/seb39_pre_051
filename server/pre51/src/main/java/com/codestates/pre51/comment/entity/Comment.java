package com.codestates.pre51.comment.entity;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.question.entity.Question;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="comment_id")
    private long commentId;

    @Column(nullable = false,name="comment_writer_id")
    private long commentWriterId;

    @Column(nullable = false, columnDefinition = "TEXT", name="comment_content")
    private String commentContent;

    @Column(nullable = false, name="comment_created_at")
    @CreatedDate
    private LocalDateTime commentCreatedAt;

    @Column(name="comment_modified_at")
    @LastModifiedDate
    private LocalDateTime commentModifiedAt;

    @ManyToOne
    @JoinColumn(name="answer_id")
    @JsonIgnore
    private Answer commentAnswers;

    @ManyToOne
    @JoinColumn(name="question_id")
    @JsonIgnore
    private Question commentQuestions;

    @Getter
    public enum CommentStatus{
        COMMENT_QUESTION,
        COMMENT_ANSWER
    }
}
