package com.codestates.pre51.questionLikes.controller;

import com.codestates.pre51.question.service.QuestionService;
import com.codestates.pre51.questionLikes.service.QuestionLikesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/questionLikes")
public class QuestionLikesController {
    private final QuestionLikesService questionLikesService;

    public QuestionLikesController(QuestionLikesService questionLikesService, QuestionService questionService) {
        this.questionLikesService = questionLikesService;
    }
    @PatchMapping("/{question-id}/{question-comment-presser-id}")
    public ResponseEntity hitAnswerLikes(@PathVariable("question-id") long questionId,
                                         @PathVariable("question-comment-presser-id") long questionCommentPresserId){

        questionLikesService.patchLikes(questionId,questionCommentPresserId);
        return new ResponseEntity<>(
                HttpStatus.OK);
    }
}
