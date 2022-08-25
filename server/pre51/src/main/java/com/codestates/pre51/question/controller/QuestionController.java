package com.codestates.pre51.question.controller;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import com.codestates.pre51.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionRepository questionRepository;
    private final QuestionService questionService;
    public QuestionController(QuestionRepository questionRepository, QuestionService questionService) {
        this.questionRepository = questionRepository;
        this.questionService=questionService;
    }

    @GetMapping("")
    public List<Question> getQuestions(){
        return questionRepository.findAll();
    }

    @GetMapping("/page")
    public Page<Question> getPagedQuestions(@RequestParam Integer page, Integer size){
        
        return questionService.findQuestionsByPageRequest(page,size);
    }

    @PostMapping("/ask")
    public Question signUp(){
        final Question question = Question.builder().question_id(0).email("test@test.com").build();
        System.out.println(question.getQuestion_id());
        System.out.println(question.getEmail());
        return questionRepository.save(question);
    }
}
