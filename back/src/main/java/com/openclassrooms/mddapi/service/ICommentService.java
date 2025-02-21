package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.User;

public interface ICommentService {

    Comment findById(Long id);

    Comment create(Comment comment);
}
