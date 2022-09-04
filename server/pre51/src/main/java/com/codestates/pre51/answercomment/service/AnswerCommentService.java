package com.codestates.pre51.answercomment.service;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.answercomment.repository.AnswerCommentRepository;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnswerCommentService {
    private final AnswerCommentRepository answerCommentRepository;
    private final UserRepository userRepository;
    public AnswerCommentService(AnswerCommentRepository answerCommentRepository, UserRepository userRepository) {
        this.answerCommentRepository = answerCommentRepository;
        this.userRepository = userRepository;
    }

    public AnswerComment createAnswerComment(AnswerComment answerComment,long answerCommentWriterId) {
        User user = userRepository.findByUserId(answerCommentWriterId);
        answerComment.setAnswerCommentWriter(user);
        return answerCommentRepository.save(answerComment);
    }

    public AnswerComment createAnswerComment(AnswerComment answerComment) {
        return answerCommentRepository.save(answerComment);
    }

    public AnswerComment updateAnswerComment(AnswerComment answerComment) {
        AnswerComment findAnswerComment = answerCommentRepository.findByAnswerCommentId(answerComment.getAnswerCommentId());
        findAnswerComment.setAnswerCommentContent(answerComment.getAnswerCommentContent());
        findAnswerComment.setAnswerCommentModifiedAt(LocalDateTime.now());
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
