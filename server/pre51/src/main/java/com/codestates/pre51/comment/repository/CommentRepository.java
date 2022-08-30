package com.codestates.pre51.comment.repository;

import com.codestates.pre51.comment.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment,Long> {
}
