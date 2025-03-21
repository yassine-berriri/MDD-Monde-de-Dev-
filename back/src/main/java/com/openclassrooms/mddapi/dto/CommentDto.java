package com.openclassrooms.mddapi.dto;

import com.openclassrooms.mddapi.model.Post;
import com.openclassrooms.mddapi.model.User;
import lombok.Data;
import org.hibernate.annotations.UpdateTimestamp;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.time.LocalDateTime;

@Data
public class CommentDto {

    private Long id;

    @NotNull
    private Long post_id;

    @NotNull
    private Long user_id;

    @NotNull
    @Size(max = 2500)
    private String description;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

}
