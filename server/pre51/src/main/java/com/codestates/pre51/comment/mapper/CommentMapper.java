package com.codestates.pre51.comment.mapper;

import com.codestates.pre51.comment.dto.CommentDTO;
import com.codestates.pre51.comment.entity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {
    Comment commentPostToComment(CommentDTO.Post requestBody);

    CommentDTO.Response commentToCommentResponse(Comment createdComment);
}
