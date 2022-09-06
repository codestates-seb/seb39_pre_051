package com.codestates.pre51.questionLikes.repository;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.questionLikes.entity.QuestionLikes;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionLikesRepository extends JpaRepository<QuestionLikes,Long> {
    QuestionLikes findByQuestionAndQuestionLikesPresserId(Question question, long questionLikesPresserId);

    long countQuestionLikesByQuestion(Question question);

    long countQuestionLikesByQuestionAndQuestionLikesPresserId(Question question, long questionLikesPresserId);
}
