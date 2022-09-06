package com.codestates.pre51.questioncomment.service;

import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.codestates.pre51.questioncomment.repository.QuestionCommentRepository;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class QuestionCommentService {

    private final QuestionCommentRepository questionCommentRepository;
    private final UserRepository userRepository;
    public QuestionCommentService(QuestionCommentRepository questionCommentRepository, UserRepository userRepository) {
        this.questionCommentRepository = questionCommentRepository;
        this.userRepository = userRepository;
    }

    public QuestionComment createQuestionComment(QuestionComment questionComment) {
        return questionCommentRepository.save(questionComment);
    }

    public QuestionComment createQuestionComment(QuestionComment questionComment, long questionCommentWriterId) {
        User user = userRepository.findByUserId(questionCommentWriterId);
        questionComment.setQuestionCommentWriter(user);
        return questionCommentRepository.save(questionComment);
    }

    public QuestionComment updateQuestionComment(QuestionComment questionComment) {
        QuestionComment findQuestionComment = questionCommentRepository.findByQuestionCommentId(questionComment.getQuestionCommentId());
        findQuestionComment.setQuestionCommentContent(questionComment.getQuestionCommentContent());
        findQuestionComment.setQuestionCommentModifiedAt(LocalDateTime.now());
        return questionCommentRepository.save(findQuestionComment);
    }

    public void deleteQuestionComment(long questionCommentId) {
        QuestionComment questionComment = questionCommentRepository.findByQuestionCommentId(questionCommentId);
        questionCommentRepository.delete(questionComment);
    }

}
