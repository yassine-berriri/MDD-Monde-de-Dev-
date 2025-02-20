package com.openclassrooms.mddapi.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.service.ITopicService;

@RestController
@RequestMapping("/topic")
public class TopicController {
	
	private ITopicService topicService;
	
	public TopicController(ITopicService topicService) {
		this.topicService = topicService;		
	}

	@GetMapping
	public List<Topic> getTopics() {
		return topicService.getTopics();
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
	
	
}
