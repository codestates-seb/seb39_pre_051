package com.codestates.pre51.answerlikes.service;

import com.codestates.pre51.answer.entity.Answer;
import com.codestates.pre51.answer.repository.AnswerRepository;
import com.codestates.pre51.answerlikes.entity.AnswerLikes;
import com.codestates.pre51.answerlikes.repository.AnswerLikesRepository;
import org.springframework.stereotype.Service;

@Service
public class AnswerLikesService {
    private final AnswerLikesRepository answerLikesRepository;
    private final AnswerRepository answerRepository;
    public AnswerLikesService(AnswerLikesRepository answerLikesRepository, AnswerRepository answerRepository) {
        this.answerLikesRepository = answerLikesRepository;
        this.answerRepository = answerRepository;
    }

    public void patchLikes(long answerId, long answerCommentPresserId) {
        Answer answer = answerRepository.findByAnswerId(answerId);
        AnswerLikes answerLikes = answerLikesRepository.findByAnswerAndAnswerLikesPresserId(answer,answerCommentPresserId);
        // 안눌렀음
        if(answerLikes==null){
            answerLikes= new AnswerLikes();
            answerLikes.setAnswer(answer);
            answerLikes.setAnswerLikesPresserId(answerCommentPresserId);
            answerLikesRepository.save(answerLikes);
        }else{
            answerLikesRepository.delete(answerLikes);
        }
        long likes = answerLikesRepository.countAnswerLikesByAnswer(answer);
        answer.setAnswerLikesCount(likes);
        answerRepository.save(answer);
        // 눌렀음
    }

}
