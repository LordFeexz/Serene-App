CREATE TABLE IF NOT EXISTS UserMood (
    id SERIAL PRIMARY KEY,
    user_id UUID NOT NULL,
    mood_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT fk_user
      FOREIGN KEY(user_id) 
      REFERENCES "User"(id),
    CONSTRAINT fk_mood
      FOREIGN KEY(mood_id)
      REFERENCES Mood(id)
);