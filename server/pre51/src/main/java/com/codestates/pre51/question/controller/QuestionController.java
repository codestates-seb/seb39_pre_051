package com.codestates.pre51.question.controller;

import com.codestates.pre51.answerlikes.entity.AnswerLikes;
import com.codestates.pre51.answerlikes.service.AnswerLikesService;
import com.codestates.pre51.dto.MultiResponseDTO;
import com.codestates.pre51.question.dto.QuestionDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.mapper.QuestionMapper;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.service.QuestionService;

import com.codestates.pre51.questionLikes.entity.QuestionLikes;
import com.codestates.pre51.questionLikes.service.QuestionLikesService;
import com.codestates.pre51.users.dto.UserGetDto;
import com.codestates.pre51.users.dto.UserLoginDto;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.beans.factory.annotation.Required;
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

    private final QuestionLikesService questionLikesService;

    private final AnswerLikesService answerLikesService;

    public QuestionController(QuestionService questionService, QuestionMapper questionMapper, QuestionLikesService questionLikesService,AnswerLikesService answerLikesService) {
        this.questionService = questionService;
        this.questionMapper=questionMapper;
        this.questionLikesService = questionLikesService;
        this.answerLikesService=answerLikesService;
    }

    @ApiOperation
    (value="모든 질문 조회" , notes="페이징 page, size 로 전체 질문 목록을 반환한다.")
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
    @GetMapping("/{question-id}/{user-id}")
    public ResponseEntity getQuestion(@PathVariable("question-id") @ApiParam(name = "질문_식별자") long questionId,
                                      @PathVariable("user-id") @ApiParam(name = "질문_식별자") long userId){
        Question question = questionService.findQuestion(questionId);
        if(question==null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }




        // 1. 토큰에 있는 유저가 누른 질문 좋아요 목록
        // questionLikes에 들어있는 데이터들 중
        // userid가 questionLikesPresserId 와 같은 questionLikes 객체 탐색
        // 그 값들 중 questionId와 같은 게 있으면 해당 번호 리턴 or boolean으로 리턴
        long count = questionLikesService.findByLikesQuestionAndPresserId(question,userId);

        QuestionDTO.Response questionToQuestionResponse = questionMapper.questionToQuestionResponse(question);
        if(count!=0){
            questionToQuestionResponse.setLikesPressedQuestionIdFromToken(questionId);
        }

        List<AnswerLikes> list = answerLikesService.findAnswerIdsByPresserId(userId);
        List<Long> list1 = new ArrayList<>();
        for(AnswerLikes data : list){
            list1.add(data.getAnswer().getAnswerId());
        }
        questionToQuestionResponse.setLikesPressedAnswersIdFromToken(list1);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionToQuestionResponse)
                ,HttpStatus.OK);
    }



    @PostMapping("/ask")
    @ApiOperation(value="질문 작성" , notes="질문-작성자-식별자, 질문-제목, 질문-내용 필요")
    public ResponseEntity postQuestion(@RequestBody QuestionDTO.Post requestBody){
        Question question = questionMapper.questionPostToQuestion(requestBody);
        long questionWriterId = question.getQuestionWriterId();
        Question createdQuestion =questionService.createQuestion(question,questionWriterId);
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

    @PatchMapping("/{question-id}/{answer-id}")
    @ApiOperation(value="질문의 답변 채택" , notes="질문-식별자, 답변-식별자 필요")
    public ResponseEntity selectBestAnswer(
            @PathVariable("question-id") @ApiParam(name = "질문_식별자") @Positive long questionId,
            @PathVariable("answer-id") @ApiParam(name="채택할 답변의 식별자") @Positive long answerId){

        Question question = questionService.findQuestion(questionId);
        Question updateQuestion =
                questionService.selectAnswer(question,answerId);

        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionMapper.questionToQuestionResponse(updateQuestion)),
                HttpStatus.OK);

    }
}
