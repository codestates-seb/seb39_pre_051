package com.codestates.pre51.question.controller;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.service.AnswerService;
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
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {
    private final QuestionService questionService;

    private final QuestionMapper questionMapper;

    private final AnswerService answerService;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, AnswerService answerService) {
        this.questionService = questionService;
        this.questionMapper=questionMapper;
        this.answerService=answerService;
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
        /* 모든 답변을 같이 딸려오게 하는 방법
        *  1. JPA 맵핑?
        *  2. response객체에 List<Answer> 포함?
        *   - answer 엔티티에 questionId 엔티티 추가해야함 jpa랑 어긋나는 느낌
        *  3. Multiresponsedto로 변환? - 아닌듯
        *
        */
        Question question = questionService.findQuestion(questionId);
        List<Answer> answer = answerService.findAnswers(question);
        question.setQuestionAnswers(answer);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question))
                ,HttpStatus.OK);
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

    @GetMapping("/{question-id}/edit")
    public ResponseEntity getQuestionEdit(@PathVariable("question-id") @Positive long questionId){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question))
                ,HttpStatus.OK);
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

    @DeleteMapping("/{question-id}")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @Positive long questionId){

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
