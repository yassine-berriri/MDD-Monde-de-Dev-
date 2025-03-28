package com.openclassrooms.mddapi.service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.stereotype.Service;

import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.repository.TopicRepository;

@Service
public class TopicService implements ITopicService {

    private TopicRepository topicRepository;
    private UserRepository userRepository;

    public TopicService(TopicRepository topicRepository, UserRepository userRepository) {
        this.topicRepository = topicRepository;
        this.userRepository = userRepository;
    }

    @Override
    public List<Topic> getTopics() {
        return topicRepository.findAll();
    }

    @Override
    public void subscribe(Long id, Long userId) {
        Topic topic = this.topicRepository.findById(id).orElse(null);
        User user = this.userRepository.findById(userId).orElse(null);
        if (topic == null || user == null) {
            throw new NotFoundException("error");
        }

        boolean alreadyParticipate = topic.getUsers().stream().anyMatch(o -> o.getId().equals(userId));
        if (alreadyParticipate) {
            throw new BadRequestException("already Participate");
        }

        topic.getUsers().add(user);

        this.topicRepository.save(topic);
    }

    @Override
    public void unSubscribe(Long id, Long userId) {
        Topic topic = this.topicRepository.findById(id).orElse(null);
        if (topic == null) {
            throw new NotFoundException("topic not found");
        }

        boolean alreadyParticipate = topic.getUsers().stream().anyMatch(o -> o.getId().equals(userId));
        if (!alreadyParticipate) {
            throw new BadRequestException("Not already Participate");
        }

        topic.setUsers(topic.getUsers().stream().filter(user -> !user.getId().equals(userId)).collect(Collectors.toList()));

        this.topicRepository.save(topic);
    }

    public Topic findById(Long id) {
        return topicRepository.findById(id).orElse(null);
    }

    @Override
    public List<Topic> getSubscribedTopicsByUserId(Long userId) {
        return topicRepository.findAll().stream()
                .filter(topic -> topic.getUsers().stream().anyMatch(user -> user.getId().equals(userId)))
                .collect(Collectors.toList());
    }

    public List<Long> getIdByUserId(Long userId) {
        return topicRepository.findAll().stream().filter(topic -> topic.getUsers().stream().anyMatch(user -> user.getId().equals(userId))).map(Topic::getId).collect(Collectors.toList());
    }

}
