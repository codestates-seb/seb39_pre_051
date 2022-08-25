package com.codestates.pre51.question.service;

import com.codestates.pre51.question.entity.Question;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
public interface QuestionService {
    Page<Question> findQuestionsByPageRequest(Pageable pageable);
}
