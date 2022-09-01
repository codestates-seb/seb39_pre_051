package com.codestates.pre51.comment.controller;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.service.AnswerService;
import com.codestates.pre51.comment.dto.CommentDTO;
import com.codestates.pre51.comment.entity.Comment;
import com.codestates.pre51.comment.mapper.CommentMapper;
import com.codestates.pre51.comment.service.CommentService;
import com.codestates.pre51.dto.SingleResponseDTO;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.service.QuestionService;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@Controller
@RequestMapping("/comments")
public class CommentController {
    private final CommentService commentService;
    private final CommentMapper commentMapper;

    private final QuestionService questionService;

    private final AnswerService answerService;

    public CommentController(CommentService commentService, CommentMapper commentMapper, QuestionService questionService, AnswerService answerService) {
        this.commentService = commentService;
        this.commentMapper = commentMapper;
        this.questionService = questionService;
        this.answerService = answerService;
    }

    @PostMapping("/{parent-id}/{comment-type}")
    @ApiOperation(value="댓글 생성" , notes="댓글-작성자-식별자, 댓글-내용, 댓글-타입 필요")
    public ResponseEntity postComment(@RequestBody CommentDTO.Post requestBody,
                                     @PathVariable("parent-id") @ApiParam(name = "부모(질문or답변) 의 식별자") long parent_id,
                                      @PathVariable("comment-type") @ApiParam(name = "답변 타입")String comment_type){
        Comment comment = commentMapper.commentPostToComment(requestBody);
        if(comment_type.equals("COMMENT_QUESTION")){
            Question question = questionService.findQuestion(parent_id);
            comment.setCommentQuestions(question);
        }
        else if(comment_type.equals("COMMENT_ANSWER")){
            Answer answer = answerService.findAnswer(parent_id);
            comment.setCommentAnswers(answer);
        }
        Comment createdComment = commentService.createComment(comment);
        CommentDTO.Response response = commentMapper.commentToCommentResponse(createdComment);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }

    @PatchMapping("/{comment-id}/edit")
    @ApiOperation(value="댓글 수정" , notes="댓글-식별자, 댓글-내용 필요")
    public ResponseEntity patchComment(
            @PathVariable("comment-id") @Positive long commentId,
            @RequestBody CommentDTO.Patch requestBody){
        requestBody.setCommentId(commentId);
        Comment comment = commentService.updateComment(commentMapper.commentPatchToComment(requestBody));

        return new ResponseEntity<>(
                new SingleResponseDTO<>(commentMapper.commentToCommentResponse(comment)),
                HttpStatus.OK);
    }
}
