package com.codestates.pre51.answer.service;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.repository.AnswerRepository;
import com.codestates.pre51.question.entity.Question;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnswerService {
    private final AnswerRepository answerRepository;
    
    public AnswerService(AnswerRepository answerRepository){
        this.answerRepository=answerRepository;
    }
    
    public List<Answer> findAnswers(){
        return answerRepository.findAll();
    }

    public Answer createAnswer(Answer answer) {
        return answerRepository.save(answer);
    }

    public Answer findQuestionsAnswers(Answer answer) {
        return answerRepository.save(answer);
    }
}
