package com.codestates.pre51.comment.service;

import com.codestates.pre51.comment.entity.Comment;
import com.codestates.pre51.comment.repository.CommentRepository;
import org.springframework.stereotype.Service;

@Service
public class CommentService {
    private final CommentRepository commentRepository;

    public CommentService(CommentRepository commentRepository) {
        this.commentRepository = commentRepository;
    }

    public Comment createComment(Comment comment) {
        return commentRepository.save(comment);
    }
}
