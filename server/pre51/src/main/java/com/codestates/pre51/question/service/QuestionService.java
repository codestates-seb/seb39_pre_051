package com.codestates.pre51.question.service;

import com.codestates.pre51.question.entity.Question;
import com.codestates.pre51.question.repository.QuestionRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;

@Service
public class QuestionService {
    private final QuestionRepository questionRepository;
    public QuestionService(QuestionRepository questionRepository) {
        this.questionRepository = questionRepository;
    }

    public Page<Question> findQuestions(int page, int size){
        return questionRepository.findAll(PageRequest.of(page,size));
    }

    public Question createQuestion(Question question){
        Question savedQuestion = questionRepository.save(question);

        return savedQuestion;
    }

    public Question findQuestion(long questionId) {

        return questionRepository.findByQuestionId(questionId);
    }

    public Question updateQuestion(Question question){
        Question findQuestion = questionRepository.findByQuestionId(question.getQuestionId());
        findQuestion.setQuestionContent(question.getQuestionContent());
        findQuestion.setQuestionTitle(question.getQuestionTitle());

        return questionRepository.save(findQuestion);
    }

    public void deleteQuestion(long questionId){
        Question question = questionRepository.findByQuestionId(questionId);
        questionRepository.delete(question);
    }
}
