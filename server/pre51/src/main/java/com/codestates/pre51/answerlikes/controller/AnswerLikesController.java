package com.codestates.pre51.answerlikes.controller;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.service.AnswerService;
import com.codestates.pre51.answerlikes.repository.AnswerLikesRepository;
import com.codestates.pre51.answerlikes.service.AnswerLikesService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/answerLikes")
public class AnswerLikesController {

    private final AnswerLikesService answerLikesService;
    public AnswerLikesController(AnswerLikesRepository answerLikesRepository, AnswerLikesService answerLikesService, AnswerService answerService) {
        this.answerLikesService = answerLikesService;
    }

    @PatchMapping("/{answer-id}/{answer-comment-presser-id}")
    public ResponseEntity hitAnswerLikes(@PathVariable("answer-id") long answerId,
                                         @PathVariable("answer-comment-presser-id") long answerCommentPresserId){

        answerLikesService.patchLikes(answerId,answerCommentPresserId);
        return new ResponseEntity<>(
                HttpStatus.OK);
    }
}
