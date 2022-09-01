package com.codestates.pre51.answercomment.repository;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answercomment.entity.AnswerComment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnswerCommentRepository extends JpaRepository<AnswerComment,Long> {
    AnswerComment findByAnswerCommentId(long answerCommentId);
    List<AnswerComment> findByAnswerComments(Answer answer);
}
