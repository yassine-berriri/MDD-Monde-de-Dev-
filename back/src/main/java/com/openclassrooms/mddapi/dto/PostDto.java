package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.Comment;
import com.openclassrooms.mddapi.model.Topic;
import com.openclassrooms.mddapi.model.User;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class PostDto {


    private Long id;


    @NotNull
    private Long topic_id;

    @NotNull
    private Long user_id;

    @NotNull
    @Size(max = 2500)
    private String title;

    @NotNull
    @Size(max = 2500)
    private String description;


    private List<Long> comments_id;


    private LocalDateTime createdAt;


    private LocalDateTime updatedAt;

}
