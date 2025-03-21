package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.UserDto;
import com.openclassrooms.mddapi.mapper.TopicMapper;
import com.openclassrooms.mddapi.mapper.UserMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.service.IUserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@RestController
@RequestMapping("api/user")
public class UserController {

    IUserService userService;

    UserMapper userMapper;

    TopicMapper topicMapper;

    UserController(IUserService userService, UserMapper userMapper, TopicMapper topicMapper){
        this.userService = userService;
        this.userMapper = userMapper;
        this.topicMapper = topicMapper;
    }

    @GetMapping ("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable("id") String id){
        User user = this.userService.findById(Long.valueOf(id));

        if (user == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok().body(this.userMapper.toDto(user));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> update(@PathVariable("id") String id, @Valid @RequestBody UserDto userDto){
        try {
            User user = this.userService.update(Long.valueOf(id), this.userMapper.toEntity(userDto));

            return ResponseEntity.ok().body(this.userMapper.toDto(user));
        } catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }

    }




}
