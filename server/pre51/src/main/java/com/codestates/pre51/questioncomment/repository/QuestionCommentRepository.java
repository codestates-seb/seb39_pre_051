package com.codestates.pre51.questioncomment.repository;

import com.codestates.pre51.questioncomment.entity.QuestionComment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionCommentRepository extends JpaRepository<QuestionComment,Long> {
    QuestionComment findByQuestionCommentId(long questionCommentId);
}
