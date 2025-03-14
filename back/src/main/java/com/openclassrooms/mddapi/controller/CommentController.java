package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.mapper.CommentMapper;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.service.ICommentService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/comment")
@Log4j2
public class CommentController {

    private ICommentService commentService;
    private CommentMapper commentMapper;

    CommentController(ICommentService commentService, CommentMapper commentMapper){
        this.commentService = commentService;
        this.commentMapper = commentMapper;
    }

    @PostMapping
    public ResponseEntity<?> create(@Valid @RequestBody CommentDto commentDto){
        Comment comment = this.commentService.create(this.commentMapper.toEntity(commentDto));
        log.info(comment);

        return ResponseEntity.ok().body(this.commentMapper.toDto(comment));
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getCommentByPostId(@PathVariable("id") String id){
        try {
            List<Comment> comments = this.commentService.getById(Long.valueOf(id));

            if (comments == null) {
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(this.commentMapper.toDto(comments));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

}
