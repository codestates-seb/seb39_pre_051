package com.codestates.pre51.answercomment.entity;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.users.entity.User;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity(name="answer_comment")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
@EntityListeners(AuditingEntityListener.class)
public class AnswerComment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="answer_comment_id")
    private long answerCommentId;

    @Column(nullable = false,name="answer_comment_writer_id")
    private long answerCommentWriterId;

    @Column(nullable = false, columnDefinition = "TEXT", name="answer_comment_content")
    private String answerCommentContent;

    @Column(nullable = false, name="answer_comment_created_at")
    @CreatedDate
    private LocalDateTime answerCommentCreatedAt;

    @Column(name="answer_comment_modified_at")
    @CreatedDate
    private LocalDateTime answerCommentModifiedAt;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User answerCommentWriter;
    @ManyToOne
    @JoinColumn(name="answer_answer_id")
    @JsonIgnore
    private Answer answerComments;
}
