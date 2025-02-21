package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.service.IPostService;
import com.openclassrooms.mddapi.service.ITopicService;
import com.openclassrooms.mddapi.service.PostService;
import lombok.extern.log4j.Log4j2;
import org.apache.commons.logging.Log;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/post")
@Log4j2
public class PostController {

    IPostService postService;

    private final PostMapper postMapper;

    public PostController(IPostService postService, PostMapper postMapper) {
        this.postService = postService;
        this.postMapper = postMapper;
    }

    @GetMapping
    public List<Post> getPosts() {
        return postService.findAll();
    }

    @PostMapping
    public ResponseEntity<?> createPost(@Valid @RequestBody PostDto postDto){
        log.info(postDto);
        Post post = this.postService.create(this.postMapper.toEntity(postDto));
        log.info(post);

        return ResponseEntity.ok().body(this.postMapper.toDto(post));

    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getPostById(@PathVariable("id") String id){
        try {
            Post post = this.postService.getById(Long.valueOf(id));

            if (post == null){
                return ResponseEntity.notFound().build();
            }

            return ResponseEntity.ok().body(this.postMapper.toDto(post));
        }catch (NumberFormatException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping("/sort")
    public List<Post> getSortedPosts(@RequestParam(name = "isDesc", required = false, defaultValue = "false") String isDesc) {
        boolean isDescBoolean = (isDesc != null && (isDesc.equalsIgnoreCase("true,") || isDesc.equalsIgnoreCase("true,true")) );

        return postService.sort(isDescBoolean);
    }







}
