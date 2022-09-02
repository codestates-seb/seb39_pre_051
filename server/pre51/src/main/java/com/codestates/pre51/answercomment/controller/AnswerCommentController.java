package com.codestates.pre51.answercomment.controller;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.service.AnswerService;
import com.codestates.pre51.answercomment.dto.AnswerCommentDTO;
import com.codestates.pre51.answercomment.entity.AnswerComment;
import com.codestates.pre51.answercomment.mapper.AnswerCommentMapper;
import com.codestates.pre51.answercomment.service.AnswerCommentService;
import com.codestates.pre51.dto.SingleResponseDTO;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import lombok.Data;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/answerComments")
public class AnswerCommentController {
    private final AnswerCommentService answerCommentService;
    private final AnswerCommentMapper answerCommentMapper;

    private final AnswerService answerService;

    public AnswerCommentController(AnswerCommentService answerCommentService, AnswerCommentMapper answerCommentMapper, AnswerService answerService) {
        this.answerCommentService=answerCommentService;
        this.answerService = answerService;
        this.answerCommentMapper = answerCommentMapper;
    }


    @PostMapping("/{answer-id}")
    @ApiOperation(value="댓글 생성" , notes="댓글-작성자-식별자, 댓글-내용 필요")
    public ResponseEntity postAnswerComment(@RequestBody AnswerCommentDTO.Post requestBody,
                                      @PathVariable("answer-id") @ApiParam(name = "답변의 식별자") long answer_id){
        AnswerComment answerComment = answerCommentMapper.answerCommentPostToAnswerComment(requestBody);
        Answer answer = answerService.findAnswer(answer_id);
        answerComment.setAnswerComments(answer);

        AnswerComment createdAnswerComment = answerCommentService.createAnswerComment(answerComment);
        AnswerCommentDTO.Response response = answerCommentMapper.answerCommentToAnswerCommentResponse(createdAnswerComment);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{answer-comment-id}/edit")
    @ApiOperation(value="답변의 댓글 수정" , notes="댓글-식별자, 댓글-내용 필요")
    public ResponseEntity patchAnswerComment(
            @PathVariable("answer-comment-id") @Positive long answerCommentId,
            @RequestBody AnswerCommentDTO.Patch requestBody){
        requestBody.setAnswerCommentId(answerCommentId);
        AnswerComment answerComment = answerCommentService.updateAnswerComment(answerCommentMapper.answerCommentPatchToAnswerComment(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDTO<>(answerCommentMapper.answerCommentToAnswerCommentResponse(answerComment)),
                HttpStatus.OK);
    }

    @DeleteMapping("/{answer-comment-id}")
    @ApiOperation(value="답변의 댓글 삭제" , notes="댓글-식별자 필요")
    public ResponseEntity deleteAnswerComment(
            @PathVariable("answer-comment-id") @ApiParam(name="답변_댓글 식별자") @Positive long answerCommentId){
        answerCommentService.deleteAnswerComment(answerCommentId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);

    }

}
