package com.codestates.pre51.question.controller;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.service.AnswerService;
import com.codestates.pre51.comment.entity.Comment;
import com.codestates.pre51.dto.MultiResponseDTO;
import com.codestates.pre51.question.dto.QuestionDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.mapper.QuestionMapper;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.service.QuestionService;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
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

    @ApiOperation
    (value="모든 게시글 조회" , notes="페이징 page, size 로 전체 질문 목록을 반환한다.")
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
    @ApiOperation(value="질문 식별자를 이용한 해당 질문 조회" , notes=" 질문-식별자로 한개의 질문을 반환한다.")
    @GetMapping("/{question-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @ApiParam(name = "질문_식별자") long questionId){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question))
                ,HttpStatus.OK);
    }

    @PostMapping("/ask")
    @ApiOperation(value="질문 작성" , notes="질문-작성자-식별자, 질문-제목, 질문-내용 필요")
    public ResponseEntity postQuestion(@RequestBody QuestionDTO.Post requestBody){
        Question question = questionMapper.questionPostToQuestion(requestBody);
        Question createdQuestion =questionService.createQuestion(question);
        QuestionDTO.Response response = questionMapper.questionToQuestionResponse(createdQuestion);

        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @GetMapping("/{question-id}/edit")
    @ApiOperation(value="질문 수정 페이지로 전환" , notes="질문-식별자 필요")
    public ResponseEntity getQuestionEdit(@PathVariable("question-id") @ApiParam(name = "질문_식별자") @Positive long questionId){
        Question question = questionService.findQuestion(questionId);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question))
                ,HttpStatus.OK);
    }

    @PatchMapping("/{question-id}/edit")
    @ApiOperation(value="질문 수정" , notes="질문_작성자-식별자, 질문-제목, 질문-내용 필요")
    public ResponseEntity patchQuestion(
            @PathVariable("question-id") @ApiParam(name = "질문_식별자") @Positive long questionId,
            @RequestBody QuestionDTO.Patch requestBody){
        requestBody.setQuestionId(questionId);

        Question question =
                questionService.updateQuestion(questionMapper.questionPatchToQuestion(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(question)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{question-id}")
    @ApiOperation(value="질문 삭제" , notes="질문-작성자-식별자, 질문-제목, 질문-내용 필요")
    public ResponseEntity deleteQuestion(
            @PathVariable("question-id") @ApiParam(name = "질문_식별자") @Positive long questionId){

        questionService.deleteQuestion(questionId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
