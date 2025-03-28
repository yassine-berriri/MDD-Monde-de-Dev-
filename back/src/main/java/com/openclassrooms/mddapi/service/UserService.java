package com.openclassrooms.mddapi.service;

import com.openclassrooms.mddapi.exception.BadRequestException;
import com.openclassrooms.mddapi.exception.NotFoundException;
import com.openclassrooms.mddapi.model.User;
import com.openclassrooms.mddapi.repository.UserRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.persistence.EntityNotFoundException;

@Service
public class UserService implements IUserService{

    UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;


    UserService(UserRepository userRepository, PasswordEncoder passwordEncoder){
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User findById(Long userId) {
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            throw new NotFoundException("user not found");
        }
        return userRepository.findById(userId).orElse(null);
    }

    @Override
    public User update(Long id, User user) {
        User existingUser = userRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException("Utilisateur non trouvé avec l'id " + id));

        existingUser.setEmail(user.getEmail());
        existingUser.setName(user.getName());
        if (user.getPassword() != null){
            existingUser.setPassword(this.passwordEncoder.encode(user.getPassword()));
        }

        return userRepository.save(existingUser);
    }

    @Override
    public User save(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new BadRequestException("Email already in use");
        }
        return this.userRepository.save(user);
    }


}
