package com.codestates.pre51.question.controller;

import com.codestates.pre51.dto.MultiResponseDTO;
import com.codestates.pre51.question.dto.QuestionDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.mapper.QuestionMapper;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.service.QuestionService;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper questionMapper;
    public QuestionController(QuestionService questionService, QuestionMapper questionMapper) {
        this.questionService = questionService;
        this.questionMapper=questionMapper;
    }

    @GetMapping("")
    public ResponseEntity getQuestions(@Positive @RequestParam int page,
                                       @Positive @RequestParam int size){
        Page<Question> pageQuestions = questionService.findQuestions(page-1 , size);
        List<Question> questions = pageQuestions.getContent();
        return new ResponseEntity<>(
                new MultiResponseDTO<>(questionMapper.questionsToQuestionResponses(questions),
                        pageQuestions),
                HttpStatus.OK);
    }

    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") long questionId){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question))
                ,HttpStatus.OK);
    }

    @PostMapping("/ask")
    public ResponseEntity postQuestion(@RequestBody QuestionDTO.Post requestBody){
        System.out.println(requestBody.getQuestionContent()); // contents 로 잘 들어옴
        Question question = questionMapper.questionPostToQuestion(requestBody);
        System.out.println("RequestBody content value: "+question.getQuestionContent());
        Question createdQuestion =questionService.createQuestion(question);
        QuestionDTO.Response response = questionMapper.questionToQuestionResponse(createdQuestion);

        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{question-id}/edit")
    public ResponseEntity patchQuestion(
            @PathVariable("question-id") @Positive long questionId,
            @RequestBody QuestionDTO.Patch requestBody){
        requestBody.setQuestionId(questionId);

        Question question =
                questionService.updateQuestion(questionMapper.questionPatchToQuestion(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question)),
                HttpStatus.OK);
    }
}
