package web

type UserRegisterProps struct {
	Username string `json:"username" form:"username" validate:"required"`
	Email    string `json:"email" form:"email" validate:"required,email"`
	Password string `json:"password" form:"password" validate:"required,password"`
}

type UserLoginProps struct {
	Email    string `json:"email" form:"email" validate:"required,email"`
	Password string `json:"password" form:"password" validate:"required"`
}

type EmailProps struct {
	Email string `json:"email" form:"email" validate:"required,email"`
}

type DefaultPagination struct {
	Page          int    `form:"page"`
	Limit         int    `form:"limit"`
	SortBy        string `form:"sort_by"`
	SortDirection string `form:"sort_direction"`
}

type Answer struct {
	Question   string `json:"question" form:"question" validate:"required"`
	UserAnswer bool   `json:"answer" form:"answer" validate:"required"`
}

type MentalHealthAnswer struct {
	Result []Answer `json:"result" form:"result" validate:"required,min=1"`
}

type AddTodayMoodProps struct {
	Date     string `json:"date" form:"date" default:"today"`
	MoodName string `json:"mood_name" form:"mood_name" validate:"required,oneof=Calm Happy Sad Energetic 'Low energy' Angry Confused Frisky Anxious"`
}

type LocationQuery struct {
	Latitude  float64 `form:"lat" binding:"required" validate:"required"`
	Longitude float64 `form:"lng" binding:"required" validate:"required"`
	Radius    uint    `form:"radius" binding:"required"`
	PageToken string  `form:"page_token" binding:"required"`
}

type UserMoodQuery struct {
	Month uint16 `form:"month" binding:"required"`
	Year  uint16 `form:"year" binding:"required"`
}

type UserVerifyProps struct {
	Token string `form:"token" json:"token" binding:"required" validate:"required"`
}
