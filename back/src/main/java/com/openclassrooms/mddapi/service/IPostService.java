package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.model.Post;

import java.util.List;

public interface IPostService {

    Post create(Post post);

    List<Post> findAll();

    Post getById(Long id);

    List<Post> findByUserId(Long userId);

    List<Post> sort(boolean isDesc);


}
