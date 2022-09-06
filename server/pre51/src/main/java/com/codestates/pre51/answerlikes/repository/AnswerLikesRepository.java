package com.codestates.pre51.answerlikes.repository;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answerlikes.entity.AnswerLikes;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerLikesRepository extends JpaRepository<AnswerLikes,Long> {
    AnswerLikes findByAnswerAndAnswerLikesPresserId(Answer answer, long answerLikesPresserId);
    long countAnswerLikesByAnswer(Answer answer);

    List<AnswerLikes> findAnswerLikesByAnswerLikesPresserId(long answerLikesPresserId);
}
