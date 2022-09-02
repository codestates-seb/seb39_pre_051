package com.codestates.pre51.answer.controller;

import com.codestates.pre51.answer.dto.AnswerDTO;
import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.mapper.AnswerMapper;
import com.codestates.pre51.answer.service.AnswerService;

import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.answercomment.service.AnswerCommentService;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.service.QuestionService;
import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.codestates.pre51.questioncomment.service.QuestionCommentService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.annotation.PostConstruct;
import javax.validation.constraints.Positive;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/answer")
public class AnswerController {
    private final AnswerService answerService;
    private final AnswerMapper answerMapper;
    private final QuestionService questionService;

    private final AnswerCommentService answerCommentService;

    private final QuestionCommentService questionCommentService;
    @PostConstruct
    public void init()   {
        Question question = Question.builder()
                .questionWriterId(0)
                .questionTitle("spring boot에서 Controller 의 역할")
                .questionContent("spring boot를 처음 공부하고 있는데, controller의 역할이 뭔지 잘 이해가 안갑니다. 알려주세요 ㅠㅠ")
                .questionCreatedAt(LocalDateTime.now())
                .build();
        questionService.createQuestion(question);

        QuestionComment questionComment = QuestionComment.builder()
                .questionCommentWriterId(1)
                .questionCommentContent("저도 궁금했는데 얼른 답변이 달렸으면 좋겠네요")
                .questionCommentCreatedAt(LocalDateTime.now())
                .questionComments(question)
                .build();
        questionCommentService.createQuestionComment(questionComment);

        Answer answer = Answer.builder()
                .answerContent("저도 잘 모르겠네요 내공냠냠")
                .answerWriterId(2)
                .answerCreatedAt(LocalDateTime.now())
                .answerQuestions(question)
                .build();
        answerService.createAnswer(answer);

        AnswerComment answerComment = AnswerComment.builder()
                .answerCommentWriterId(3)
                .answerComments(answer)
                .answerCommentContent("신고했습니다")
                .answerCommentCreatedAt(LocalDateTime.now())
                .build();
        answerCommentService.createAnswerComment(answerComment);

        answer = Answer.builder()
                .answerContent("Controller는 MVC 패턴의 C에 해당하고, 주로 사용자의 요청을 처리 한 후 지정된 뷰에 모델 객체를 넘겨주는 역할을 수행한다. 지정된 뷰에 모델 객체를 넘겨주는 역할은 두 가지로 나누어 설명할 수 있다. 1. 사용자들이 웹브라우저에서 'URI *'로 요청을 보내면, 그 요청을 컨트롤러가 받게된다. 2. 요청에 대한 응답(View)을 반환한다.")
                .answerWriterId(4)
                .answerCreatedAt(LocalDateTime.now())
                .answerQuestions(question)
                .build();
        answerService.createAnswer(answer);

        answerComment = AnswerComment.builder()
                .answerCommentWriterId(5)
                .answerComments(answer)
                .answerCommentContent("친절한 답변 감사합니다.")
                .answerCommentCreatedAt(LocalDateTime.now())
                .build();
        answerCommentService.createAnswerComment(answerComment);
    }

    public AnswerController(AnswerService answerService, AnswerMapper answerMapper, QuestionService questionService, AnswerCommentService answerCommentService, QuestionCommentService questionCommentService){
        this.answerMapper=answerMapper;
        this.answerService=answerService;
        this.questionService = questionService;
        this.answerCommentService = answerCommentService;
        this.questionCommentService = questionCommentService;
    }

    @GetMapping("")
    @ApiOperation(value="DB에 있는 모든 답변 조회" , notes="사용 X POSTMAN 응답 확인용")
    public ResponseEntity getAnswers(){
        List<Answer> answers = answerService.findAnswers();
        return new ResponseEntity<>(
                answerMapper.answersToAnswerResponses(answers),
                HttpStatus.OK);
    }

    @PostMapping("/{question-id}")
    @ApiOperation(value="답변_생성" , notes="답변-작성자-식별자, 답변-내용 필요")
    public ResponseEntity postAnswer(@RequestBody AnswerDTO.Post requestBody,
                                     @PathVariable("question-id") @ApiParam(name = "질문_식별자")long question_id){
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
    @ApiOperation(value="답변-수정" , notes="답변-식별자, 답변-내용 필요")
    public ResponseEntity patchAnswer(
            @PathVariable("answer-id") @ApiParam(name = "답변_식별자") @Positive long answerId,
            @RequestBody AnswerDTO.Patch requestBody){
        requestBody.setAnswerId(answerId);
        Answer answer =
                answerService.updateAnswer(answerMapper.answerPatchToAnswer(requestBody));


        return new ResponseEntity<>(
                new SingleResponseDTO<>(answerMapper.answerToAnswerResponse(answer)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-id}")
    @ApiOperation(value="답변-삭제" , notes="답변-식별자 필요")
    public ResponseEntity deleteQuestion(
            @PathVariable("answer-id") @ApiParam(name = "답변_식별자") @Positive long answerId){

        answerService.deleteAnswer(answerId);

        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
