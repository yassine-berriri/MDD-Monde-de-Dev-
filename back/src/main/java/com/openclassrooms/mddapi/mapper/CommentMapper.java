package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.PostService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {PostService.class, UserService.class}, imports = { Post.class, User.class, Optional.class})
public abstract class CommentMapper implements EntityMapper<CommentDto, Comment>{

    @Autowired
    protected PostService postService;

    @Autowired
    protected UserService userService;

    @Mappings({
            @Mapping(source = "description", target = "description"),
            @Mapping(target = "post", expression = "java(commentDto.getPost_id() != null ? this.postService.getById(commentDto.getPost_id()) : null)"),
            @Mapping(target = "user", expression = "java(commentDto.getUser_id() != null ? this.userService.findById(commentDto.getUser_id()) : null)"),
    })
    public abstract Comment toEntity(CommentDto commentDto);

    @Mappings({
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "post.id", target = "post_id"),
            @Mapping(source = "user.id", target = "user_id"),
    })
    public abstract CommentDto toDto(Comment comment);
}
