package com.openclassrooms.mddapi.controller;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.service.IPostService;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("api/post")
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
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto) {
        Post post = this.postService.create(this.postMapper.toEntity(postDto));

        return ResponseEntity.ok().body(this.postMapper.toDto(post));
    }



    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable("id") String id) {

            Post post = this.postService.getById(Long.valueOf(id));

            return ResponseEntity.ok().body(this.postMapper.toDto(post));

    }

    @GetMapping("/sort")
    public List<Post> getSortedPosts(@RequestParam(name = "isDesc", required = false, defaultValue = "false") String isDesc) {
        boolean isDescBoolean = (isDesc != null && (isDesc.equalsIgnoreCase("true,") || isDesc.equalsIgnoreCase("true,true") || isDesc.equalsIgnoreCase("true")));

        return postService.sort(isDescBoolean);
    }


    @GetMapping("/user/{userId}")
    public ResponseEntity<List<PostDto>> getPostsByUserId(@PathVariable("userId") String userId) {
            List<Post> posts = postService.findByUserId(Long.valueOf(userId));
            return ResponseEntity.ok().body(this.postMapper.toDto(posts));
    }


}
