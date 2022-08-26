package com.codestates.pre51.question.service;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public class QuestionServiceImpl implements QuestionService{
    private final QuestionRepository questionRepository;

    public QuestionServiceImpl(QuestionRepository questionRepository){
        this.questionRepository=questionRepository;
    }
    @Override
    public Page<Question> findQuestionsByPageRequest(Pageable pageable) {
        return questionRepository.findAll(pageable);
    }
}
