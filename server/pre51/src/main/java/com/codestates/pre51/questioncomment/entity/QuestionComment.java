package com.codestates.pre51.questioncomment.entity;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.users.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import lombok.extern.jackson.Jacksonized;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="question_comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class QuestionComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_comment_id")
    private long questionCommentId;

    @Column(nullable = false,name="question_comment_writer_id")
    private long questionCommentWriterId;

    @Column(nullable = false, columnDefinition = "TEXT", name="question_comment_content")
    private String questionCommentContent;

    @Column(nullable = false, name="question_comment_created_at")
    @CreatedDate
    private LocalDateTime questionCommentCreatedAt;

    @Column(name="question_comment_modified_at")
    @CreatedDate
    private LocalDateTime questionCommentModifiedAt;

    @ManyToOne
    @JoinColumn(name="question_comment_question_id")
    private Question questionComments;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User questionCommentWriter;
}
