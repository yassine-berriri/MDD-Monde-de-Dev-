package com.openclassrooms.mddapi.dto;

import lombok.NonNull;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.validation.constraints.Email;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

public class UserDto {

    private Long id;


    @NonNull
    @Size(max = 50)
    private String name;

    @NonNull
    @Size(max = 50)
    @Email
    private String email;




    private LocalDateTime createdAt;


    private LocalDateTime updatedAt;
}
