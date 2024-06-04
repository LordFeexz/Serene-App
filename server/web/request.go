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
