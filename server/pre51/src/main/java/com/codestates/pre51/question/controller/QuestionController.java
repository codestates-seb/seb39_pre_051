package com.codestates.pre51.question.controller;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("")
public class QuestionController {
    private final QuestionRepository questionRepository;

    public QuestionController(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    @GetMapping("/questions")
    public String getQuestions(){
        return "hello world";
    }

    @PostMapping("/signup")
    public Question signUp(){
        final Question question = Question.builder().question_id(0).email("test@test.com").build();
        System.out.println(question.getQuestion_id());
        System.out.println(question.getEmail());
        return questionRepository.save(question);
    }
}
