package com.codestates.pre51.answer.service;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.repository.AnswerRepository;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.users.entity.User;
import com.codestates.pre51.users.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    private final UserRepository userRepository;
    public AnswerService(AnswerRepository answerRepository, UserRepository userRepository){
        this.answerRepository=answerRepository;
        this.userRepository = userRepository;
    }
    
    public List<Answer> findAnswers(){

        return answerRepository.findAll();
    }


    public List<Answer> findAnswers(Question question){

        return answerRepository.findAllByAnswerQuestions(question);
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }
    public Answer createAnswer(Answer answer,long answerWriterId) {
        User user = userRepository.findByUserId(answerWriterId);
        answer.setAnswerWriter(user);
        return answerRepository.save(answer);
    }
    public Answer findQuestionsAnswers(Answer answer) {
        return answerRepository.save(answer);
    }

    public void deleteAnswer(long answerId) {
        Answer answer = answerRepository.findByAnswerId(answerId);
        answerRepository.delete(answer);
    }

    public Answer updateAnswer(Answer answer) {
        Answer findAnswer = answerRepository.findByAnswerId(answer.getAnswerId());
        findAnswer.setAnswerContent(answer.getAnswerContent());
        findAnswer.setAnswerModifiedAt(LocalDateTime.now());
        return answerRepository.save(findAnswer);
    }

    public Answer findAnswer(long answerId) {
        return answerRepository.findByAnswerId(answerId);
    }
}
