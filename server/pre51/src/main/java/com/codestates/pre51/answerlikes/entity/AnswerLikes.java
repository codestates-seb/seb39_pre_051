package com.codestates.pre51.answerlikes.entity;

import com.codestates.pre51.answer.entity.Answer;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity(name="answer_likes")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class AnswerLikes {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="answer_likes_id")
    private long answerLikesId;

    @OneToOne
    @JoinColumn(name = "answer_id")
    private Answer answer;

    @Column(name="answer_likes_presser_id")
    private long answerLikesPresserId;



}
