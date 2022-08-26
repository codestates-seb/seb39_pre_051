package com.codestates.pre51.question.controller;

import com.codestates.pre51.question.dto.QuestionDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.mapper.QuestionMapper;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.repository.QuestionRepository;
import com.codestates.pre51.question.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper questionMapper;
    public QuestionController(QuestionService questionService, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.questionMapper=questionMapper;
    }

    @GetMapping("/questions")
    public String getQuestions(){
        return "hello world";
    }


    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody QuestionDTO.Post requestBody){
        Question question = questionMapper.questionPostToQuestion(requestBody);
        Question createdQuestion =questionService.createQuestion(question);
        QuestionDTO.Response response = questionMapper.questionToQuestionResponse(createdQuestion);

        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }
}
