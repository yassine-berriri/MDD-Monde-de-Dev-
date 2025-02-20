package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;

import com.openclassrooms.mddapi.model.Topic;

public interface ITopicService {

	List<Topic> getTopics();

	void subscribe(Long id, Long userId);

	void unSubscribe(Long id, Long userId);

	 Topic findById(Long id);
}
