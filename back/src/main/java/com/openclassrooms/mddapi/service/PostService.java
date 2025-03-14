package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.dto.PostDto;
import com.openclassrooms.mddapi.mapper.PostMapper;
import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.PostRepository;
import org.springframework.stereotype.Service;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostService implements IPostService {

	private PostRepository postRepository;

	private TopicService topicService;

	private PostMapper postMapper;
	
	public PostService(PostRepository postRepository, TopicService topicService, PostMapper postMapper) {
		this.postRepository = postRepository;
		this.topicService = topicService;
		this.postMapper = postMapper;
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
	public List<Post> findByUserId(Long userId) {
		List<Long> topicIds = topicService.getIdByUserId(userId);

		if (topicIds.isEmpty()) {
			return List.of();
		}

		return postRepository.findAll().stream()
				.filter(post -> topicIds.contains(post.getTopic().getId()))
				.collect(Collectors.toList());
	}

	@Override
	public List<Post> sort(boolean isDesc) {
		return isDesc ? postRepository.findAllByOrderByCreatedAtDesc()
				: postRepository.findAllByOrderByCreatedAtAsc();
	}
}
