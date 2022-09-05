package com.codestates.pre51.question.service;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    private final UserRepository userRepository;
    public QuestionService(QuestionRepository questionRepository, UserRepository userRepository) {
        this.questionRepository = questionRepository;
        this.userRepository = userRepository;
    }

    public Page<Question> findQuestions(int page, int size){
        return questionRepository.findAll(PageRequest.of(page,size));
    }

    public Question createQuestion(Question question){
        Question savedQuestion = questionRepository.save(question);

        return savedQuestion;
    }

    public Question createQuestion(Question question, long questionWriterId){
        User user = userRepository.findByUserId(questionWriterId);
        question.setQuestionWriter(user);
        return questionRepository.save(question);
    }

    public Question findQuestion(long questionId) {
        return questionRepository.findByQuestionId(questionId);
    }

    public Question updateQuestion(Question question){
        Question findQuestion = questionRepository.findByQuestionId(question.getQuestionId());
        findQuestion.setQuestionContent(question.getQuestionContent());
        findQuestion.setQuestionTitle(question.getQuestionTitle());
        findQuestion.setQuestionModifiedAt(LocalDateTime.now());
        return questionRepository.save(findQuestion);
    }

    public void deleteQuestion(long questionId){
        Question question = questionRepository.findByQuestionId(questionId);
        questionRepository.delete(question);
    }

    public Question selectAnswer(Question question,long answerId){
        Question findQuestion = questionRepository.findByQuestionId(question.getQuestionId());
        findQuestion.setQuestionBestAnswerId(answerId);
        findQuestion.setQuestionAnsweredAt(LocalDateTime.now());
        return questionRepository.save(findQuestion);
    }
}
