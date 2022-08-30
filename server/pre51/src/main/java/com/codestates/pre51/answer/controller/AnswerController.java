package com.codestates.pre51.answer.controller;

import com.codestates.pre51.answer.dto.AnswerDTO;
import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.mapper.AnswerMapper;
import com.codestates.pre51.answer.service.AnswerService;

import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.dto.QuestionDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.service.QuestionService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final QuestionService questionService;

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper, QuestionService questionService){
        this.answerMapper=answerMapper;
        this.answerService=answerService;
        this.questionService = questionService;
    }

    @GetMapping("")
    public ResponseEntity getAnswers(){
        List<Answer> answers = answerService.findAnswers();
        return new ResponseEntity<>(
                answerMapper.answersToAnswerResponses(answers),
                HttpStatus.OK);
    }

    @PostMapping("/{question-id}")
    public ResponseEntity postAnswer(@RequestBody AnswerDTO.Post requestBody,
                                     @PathVariable("question-id") long question_id){
        Answer answer = answerMapper.answerPostToAnswer(requestBody);
        Question question = questionService.findQuestion(question_id);
        answer.setAnswerQuestions(question);

        Answer createdAnswer = answerService.createAnswer(answer);
        AnswerDTO.Response response = answerMapper.answerToAnswerResponse(createdAnswer);

        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-id}/edit")
    public ResponseEntity patchQuestion(
            @PathVariable("answer-id") @Positive long answerId,
            @RequestBody AnswerDTO.Patch requestBody){
        requestBody.setAnswerId(answerId);
        System.out.println(requestBody.getAnswerId()+" ,"+requestBody.getAnswerContent());
        Answer answer =
                answerService.updateAnswer(answerMapper.answerPatchToAnswer(requestBody));


        return new ResponseEntity<>(
                new SingleResponseDTO<>(answerMapper.answerToAnswerResponse(answer)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("answer-id") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
