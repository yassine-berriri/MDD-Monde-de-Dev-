package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;
import org.springframework.stereotype.Service;

@Service
public class CommentService implements ICommentService {

    CommentRepository commentRepository;

    CommentService(CommentRepository commentRepository){
        this.commentRepository = commentRepository;
    }


    @Override
    public Comment findById(Long id) {
        return this.commentRepository.findById(id).orElse(null);
    }

    @Override
    public Comment create(Comment comment) {
        return this.commentRepository.save(comment);
    }
}
