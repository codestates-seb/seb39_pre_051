package com.codestates.pre51.question.mapper;

import com.codestates.pre51.question.dto.QuestionDTO;
import com.codestates.pre51.question.entity.Question;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface QuestionMapper {
    Question questionPostToQuestion(QuestionDTO.Post requestBody);

    QuestionDTO.Response questionToQuestionResponse(Question question);
    List<QuestionDTO.Response> questionsToQuestionResponses(List<Question> questions);
    Question questionPatchToQuestion(QuestionDTO.Patch requestBody);
}
