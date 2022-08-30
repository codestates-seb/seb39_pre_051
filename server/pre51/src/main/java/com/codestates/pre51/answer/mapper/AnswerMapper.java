package com.codestates.pre51.answer.mapper;

import com.codestates.pre51.answer.dto.AnswerDTO;
import com.codestates.pre51.answer.entity.Answer;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface AnswerMapper {
    List<AnswerDTO.Response> answersToAnswerResponses(List<Answer> answer);

    Answer answerPostToAnswer(AnswerDTO.Post requestBody);

    AnswerDTO.Response answerToAnswerResponse(Answer answer);

    Answer answerPatchToAnswer(AnswerDTO.Patch requestBody);
}
