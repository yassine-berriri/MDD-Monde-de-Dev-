-- Insérer des utilisateurs
INSERT INTO users (name, email, password, created_at) VALUES
                                                          ('Alice', 'alice@example.com', 'password123', NOW()),
                                                          ('Bob', 'bob@example.com', 'password123', NOW());

-- Insérer des topics
INSERT INTO topics (name, description) VALUES
                                           ('Java', 'Tout sur Java'),
                                           ('Spring Boot', 'Développement avec Spring Boot');

-- Insérer des posts
INSERT INTO posts (topic_id, user_id, title, description, created_at) VALUES
                                                                          (1, 1, 'Les bases de Java', 'Introduction à Java', NOW()),
                                                                          (2, 2, 'Spring Boot et JPA', 'Connexion avec MySQL', NOW());


