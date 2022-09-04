package com.codestates.pre51.questioncomment.controller;

import com.codestates.pre51.questioncomment.dto.QuestionCommentDTO;
import com.codestates.pre51.questioncomment.entity.QuestionComment;
import com.codestates.pre51.questioncomment.mapper.QuestionCommentMapper;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.service.QuestionService;
import com.codestates.pre51.questioncomment.service.QuestionCommentService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/questionComments")
public class QuestionCommentController {

    private final QuestionCommentService questionCommentService;
    private final QuestionCommentMapper questionCommentMapper;
    private final QuestionService questionService;


    public QuestionCommentController(QuestionCommentService questionCommentService,
                                     QuestionCommentMapper questionCommentMapper,
                                     QuestionService questionService) {
        this.questionCommentService = questionCommentService;
        this.questionCommentMapper = questionCommentMapper;
        this.questionService = questionService;
    }


    @PostMapping("/{question-id}")
    @ApiOperation(value="댓글 생성" , notes="댓글-작성자-식별자, 댓글-내용")
    public ResponseEntity postQuestionComment(@RequestBody QuestionCommentDTO.Post requestBody,
                                     @PathVariable("question-id") @ApiParam(name = "질문의 식별자") long question_id){
        QuestionComment questionComment = questionCommentMapper.questionCommentPostToQuestionComment(requestBody);
        long questionCommentWriterId=questionComment.getQuestionCommentWriterId();
        Question question = questionService.findQuestion(question_id);
        questionComment.setQuestionComments(question);

        QuestionComment createdQuestionComment = questionCommentService.createQuestionComment(questionComment,questionCommentWriterId);
        QuestionCommentDTO.Response response = questionCommentMapper.questionCommentToQuestionCommentResponse(createdQuestionComment);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{question-comment-id}/edit")
    @ApiOperation(value="질문의 댓글 수정" , notes="댓글-식별자, 댓글-내용 필요")
    public ResponseEntity patchQuestionComment(
            @PathVariable("question-comment-id") @Positive long questionCommentId,
            @RequestBody QuestionCommentDTO.Patch requestBody){
        requestBody.setQuestionCommentId(questionCommentId);
        QuestionComment questionComment = questionCommentService.updateQuestionComment(questionCommentMapper.questionCommentPatchToQuestionComment(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDTO<>(questionCommentMapper.questionCommentToQuestionCommentResponse(questionComment)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{question-comment-id}")
    @ApiOperation(value="질문의 댓글 삭제" , notes="댓글-식별자 필요")
    public ResponseEntity deleteQuestionComment(
            @PathVariable("question-comment-id") @ApiParam(name="질문_댓글 식별자") @Positive long questionCommentId){
        questionCommentService.deleteQuestionComment(questionCommentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }
}
