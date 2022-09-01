package com.codestates.pre51.questioncomment.service;

import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.codestates.pre51.questioncomment.repository.QuestionCommentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class QuestionCommentService {

    private final QuestionCommentRepository questionCommentRepository;

    public QuestionCommentService(QuestionCommentRepository questionCommentRepository) {
        this.questionCommentRepository = questionCommentRepository;
    }

    public QuestionComment createQuestionComment(QuestionComment questionComment) {
        return questionCommentRepository.save(questionComment);
    }

    public QuestionComment updateQuestionComment(QuestionComment questionComment) {
        QuestionComment findQuestionComment = questionCommentRepository.findByQuestionCommentId(questionComment.getQuestionCommentId());
        findQuestionComment.setQuestionCommentContent(questionComment.getQuestionCommentContent());

        return questionCommentRepository.save(findQuestionComment);
    }

    public void deleteQuestionComment(long questionCommentId) {
        QuestionComment questionComment = questionCommentRepository.findByQuestionCommentId(questionCommentId);
        questionCommentRepository.delete(questionComment);
    }
}
