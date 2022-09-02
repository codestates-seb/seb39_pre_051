package com.codestates.pre51.answerlikes.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/answerLikes")
public class AnswerLikesController {
    @PatchMapping("/{answer-comment-id}/{answer-comment-presser-id}")
    public ResponseEntity hitAnswerLikes(@PathVariable("answer-comment-id") long answerCommentId,
                                         @PathVariable("answer-comment-presser-id") long answerCommentPresserId){
        return new ResponseEntity<>(
                HttpStatus.OK);
    }
}
