package com.codestates.pre51.answerlikes.entity;

import javax.persistence.*;

@Entity(name="answer_likes")
public class AnswerLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="answer_likes_id")
    private long answerLikesId;

    @Column(name="answer_likes_answer_id")
    private long answerLikesAnswerId;

    @Column(name="answer_likes_presser_id")
    private long answerLikedPresserId;
}
