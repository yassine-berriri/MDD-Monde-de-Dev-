package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;

import java.util.List;

public interface ICommentService {

    Comment findById(Long id);

    Comment create(Comment comment);

    List<Comment> getById(Long postId);
}
