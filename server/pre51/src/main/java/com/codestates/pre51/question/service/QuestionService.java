package com.codestates.pre51.question.service;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;

    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Question createQuestion(Question question){
        Question savedQuestion = questionRepository.save(question);

        return savedQuestion;
    }
}
