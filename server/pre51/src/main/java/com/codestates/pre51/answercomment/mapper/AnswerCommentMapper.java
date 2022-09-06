package com.codestates.pre51.answercomment.mapper;

import com.codestates.pre51.answercomment.dto.AnswerCommentDTO;
import com.codestates.pre51.answercomment.entity.AnswerComment;
import org.mapstruct.Mapper;

import java.time.LocalDateTime;

@Mapper(componentModel = "spring")
public interface AnswerCommentMapper {
    AnswerComment answerCommentPostToAnswerComment(AnswerCommentDTO.Post requestBody);

    AnswerCommentDTO.Response answerCommentToAnswerCommentResponse(AnswerComment createdAnswerComment);

    AnswerComment answerCommentPatchToAnswerComment(AnswerCommentDTO.Patch requestBody);
}
