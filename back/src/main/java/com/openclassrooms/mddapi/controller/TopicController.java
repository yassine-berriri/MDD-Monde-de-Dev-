package com.openclassrooms.mddapi.controller;

import java.util.List;

import com.openclassrooms.mddapi.mapper.TopicMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.service.ITopicService;

@RestController
@RequestMapping("/api/topic")
public class TopicController {
	
	private ITopicService topicService;

	private final TopicMapper topicMapper;
	
	public TopicController(ITopicService topicService, TopicMapper topicMapper) {
		this.topicService = topicService;
		this.topicMapper = topicMapper;
	}

	@GetMapping
	public ResponseEntity<?> getTopics() {
		List<Topic>  topics =  topicService.getTopics();

		return ResponseEntity.ok().body(this.topicMapper.toDto(topics));
	}

	@PostMapping("{id}/subscribe/{userId}")
	public ResponseEntity<?> subscribe(@PathVariable("id") String id, @PathVariable("userId") String userId){
		try {
			this.topicService.subscribe(Long.parseLong(id), Long.parseLong(userId));

			return ResponseEntity.ok().build();
		} catch (NumberFormatException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@PostMapping("{id}/unSubscribe/{userId}")
	public ResponseEntity<?> unSubscribe(@PathVariable("id") String id, @PathVariable("userId") String userId){
		try {
			this.topicService.unSubscribe(Long.parseLong(id), Long.parseLong(userId));

			return ResponseEntity.ok().build();
		} catch (NumberFormatException e) {
			return ResponseEntity.badRequest().build();
		}
	}

	@GetMapping ("subscribed/{id}")
	public ResponseEntity<?> getSubscribedTopicsByUserId(@PathVariable("id") String id){
		try {
			List<Topic> topics = topicService.getSubscribedTopicsByUserId(Long.valueOf(id));
			return ResponseEntity.ok().body(this.topicMapper.toDto(topics));
		} catch (NumberFormatException e) {
			return null;
		}
	}
	
	
}
