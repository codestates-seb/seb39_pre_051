package com.codestates.pre51.questionLikes.service;

import com.codestates.pre51.answerlikes.entity.AnswerLikes;
import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import com.codestates.pre51.questionLikes.entity.QuestionLikes;
import com.codestates.pre51.questionLikes.repository.QuestionLikesRepository;
import org.springframework.stereotype.Service;

@Service
public class QuestionLikesService {
    private final QuestionLikesRepository questionLikesRepository;
    private final QuestionRepository questionRepository;

    public QuestionLikesService(QuestionLikesRepository questionLikesRepository, QuestionRepository questionRepository) {
        this.questionLikesRepository = questionLikesRepository;
        this.questionRepository = questionRepository;
    }

    public void patchLikes(long questionId, long questionCommentPresserId) {
        Question question = questionRepository.findByQuestionId(questionId);
        QuestionLikes questionLikes = questionLikesRepository.findByQuestionAndQuestionLikesPresserId(question,questionCommentPresserId);

        if(questionLikes==null){
            questionLikes= new QuestionLikes();
            questionLikes.setQuestion(question);
            questionLikes.setQuestionLikesPresserId(questionCommentPresserId);
            questionLikesRepository.save(questionLikes);
        }else{
            questionLikesRepository.delete(questionLikes);
        }
        long likes = questionLikesRepository.countQuestionLikesByQuestion(question);
        question.setQuestionLikesCount(likes);
        questionRepository.save(question);
    }

    public long findByLikesQuestionAndPresserId(Question question,long questionLikesPresserId) {
        return questionLikesRepository.countQuestionLikesByQuestionAndQuestionLikesPresserId(question,questionLikesPresserId);
    }
}
