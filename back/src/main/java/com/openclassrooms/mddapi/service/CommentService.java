package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.repository.CommentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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

    @Override
    public List<Comment> getById(Long postId) {
        return commentRepository.findAll().stream()
                .filter(comment -> comment.getPost().getId().equals(postId))
                .collect(Collectors.toList());
    }
}
