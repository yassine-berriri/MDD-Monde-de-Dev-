package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;

@Service
public class PostService implements IPostService {

	private PostRepository postRepository;
	
	public PostService(PostRepository postRepository) {
		this.postRepository = postRepository;
	}


	@Override
	public Post create(Post post) {
		return postRepository.save(post);
	}

	@Override
	public List<Post> findAll() {
		return postRepository.findAll();
	}

	@Override
	public Post getById(Long id) {
		return postRepository.getById(id);
	}

	@Override
	public List<Post> sort(boolean isDesc) {
		return isDesc ? postRepository.findAllByOrderByCreatedAtDesc()
				: postRepository.findAllByOrderByCreatedAtAsc();
	}
}
