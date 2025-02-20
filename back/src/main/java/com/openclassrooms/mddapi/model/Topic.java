package com.openclassrooms.mddapi.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "topics")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Topic {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "topic_id")
	private Long id;

	@Column(nullable = false)
	private String name;

	@Column(name = "description")
	private String description;

	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(
			name = "PARTICIPATE",
			joinColumns = @JoinColumn( name = "topic_id" ),
			inverseJoinColumns = @JoinColumn( name = "user_id" ) )
	private List<User> users;

	@CreatedDate
	@Column(name = "created_at", updatable = false)
	private LocalDateTime createdAt;

	
}
