package com.codestates.pre51.questionLikes.entity;

import com.codestates.pre51.question.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name="question_likes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="question_likes_id")
    private long questionLikesId;

    @OneToOne
    @JoinColumn(name = "question_id")
    private Question question;

    @Column(name="question_likes_presser_id")
    private long questionLikesPresserId;
}
