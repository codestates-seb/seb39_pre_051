package com.codestates.pre51.questioncomment.mapper;

import com.codestates.pre51.questioncomment.dto.QuestionCommentDTO;
import com.codestates.pre51.questioncomment.entity.QuestionComment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface QuestionCommentMapper {
    QuestionComment questionCommentPostToQuestionComment(QuestionCommentDTO.Post requestBody);

    QuestionCommentDTO.Response questionCommentToQuestionCommentResponse(QuestionComment createdQuestionComment);

    QuestionComment questionCommentPatchToQuestionComment(QuestionCommentDTO.Patch requestBody);
}
