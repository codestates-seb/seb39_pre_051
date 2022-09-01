package com.codestates.pre51.answercomment.service;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.answercomment.repository.AnswerCommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerCommentService {
    private final AnswerCommentRepository answerCommentRepository;

    public AnswerCommentService(AnswerCommentRepository answerCommentRepository) {
        this.answerCommentRepository = answerCommentRepository;
    }

    public AnswerComment createAnswerComment(AnswerComment answerComment) {
        return answerCommentRepository.save(answerComment);
    }

    public AnswerComment updateAnswerComment(AnswerComment answerComment) {
        AnswerComment findAnswerComment = answerCommentRepository.findByAnswerCommentId(answerComment.getAnswerCommentId());
        findAnswerComment.setAnswerCommentContent(answerComment.getAnswerCommentContent());

        return answerCommentRepository.save(findAnswerComment);
    }

    public List<AnswerComment> findCommentsByAnswer(Answer answer){
        return answerCommentRepository.findByAnswerComments(answer);
    }


    public void deleteAnswerComment(long answerCommentId) {
        AnswerComment answerComment = answerCommentRepository.findByAnswerCommentId(answerCommentId);
        answerCommentRepository.delete(answerComment);
    }
}
