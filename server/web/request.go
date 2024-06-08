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
	UserAnswer bool   `json:"answer" form:"answer"`
}

type MentalHealthAnswer struct {
	Result []Answer `json:"result" form:"result" validate:"required,min=1"`
}
