package com.openclassrooms.mddapi.mapper;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.TopicService;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.Optional;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = {TopicService.class}, imports = {Arrays.class, Collectors.class, Topic.class, User.class, Collections.class, Optional.class})
public abstract class PostMapper {

    @Autowired
    protected TopicService topicService; // ✅ Injection correcte pour une classe abstraite
    @Mappings({
            @Mapping(source = "description", target = "description"),
            @Mapping(target = "topic", expression = "java(postDto.getTopic_id() != null ? this.topicService.findById(postDto.getTopic_id()) : null)"),
            //@Mapping(target = "users", expression = "java(Optional.ofNullable(sessionDto.getUsers()).orElseGet(Collections::emptyList).stream().map(user_id -> { User user = this.userService.findById(user_id); if (user != null) { return user; } return null; }).collect(Collectors.toList()))"),
    })
    public abstract Post toEntity(PostDto postDto);

    @Mappings({
            @Mapping(source = "description", target = "description"),
            @Mapping(source = "post.topic.id", target = "topic_id"),
    })
    public abstract PostDto toDto(Post post);
}
