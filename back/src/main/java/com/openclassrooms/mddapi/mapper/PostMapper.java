package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.CommentDto;
import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.dto.TopicDto;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.CommentService;
import com.openclassrooms.mddapi.service.TopicService;
import com.openclassrooms.mddapi.service.UserService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {TopicService.class, UserService.class}, imports = {Arrays.class, Collectors.class, Topic.class, User.class, Collections.class, Optional.class})
public abstract class PostMapper  implements EntityMapper<PostDto, Post>  {

    @Autowired
    protected TopicService topicService;

    @Autowired
    protected UserService userService;

    @Autowired
    protected CommentService commentService;


    @Mappings({
            @Mapping(source = "description", target = "description"),
            @Mapping(target = "topic", expression = "java(postDto.getTopic_id() != null ? this.topicService.findById(postDto.getTopic_id()) : null)"),
            @Mapping(target = "user", expression = "java(postDto.getUser_id() != null ? this.userService.findById(postDto.getUser_id()) : null)"),
            @Mapping(target = "comments", ignore = true),
    })
    public abstract Post toEntity(PostDto postDto);

    @Mappings({
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "post.topic.id", target = "topic_id"),
            @Mapping(source = "post.user.id", target = "user_id"),
            @Mapping(target = "comments_id", expression = "java(post.getComments() != null ? post.getComments().stream().map(c -> c.getId()).collect(Collectors.toList()) : Collections.emptyList())"),
            @Mapping(source = "post.user.name", target = "author"),
            @Mapping(source = "post.topic.name", target = "topic")
    })
    public abstract PostDto toDto(Post post);
}
