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
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

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
    public ResponseEntity postComment(@RequestBody CommentDTO.Post requestBody,
                                     @PathVariable("parent-id") long parent_id,
                                      @PathVariable("comment-type") String comment_type){
        Comment comment = commentMapper.commentPostToComment(requestBody);
        if(comment_type.equals("COMMENT_QUESTION")){
            System.out.println("*********Question*********");
            Question question = questionService.findQuestion(parent_id);
            comment.setCommentQuestions(question);
        }
        else if(comment_type.equals("COMMENT_ANSWER")){
            System.out.println("*********Answer*********");
            Answer answer = answerService.findAnswer(parent_id);
            comment.setCommentAnswers(answer);
        }
        Comment createdComment = commentService.createComment(comment);
        CommentDTO.Response response = commentMapper.commentToCommentResponse(createdComment);
        return new ResponseEntity<>(
                new SingleResponseDTO<>(response),
                HttpStatus.CREATED);
    }
}
