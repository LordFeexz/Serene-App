package user

import (
	"fmt"
	"os"
	h "serene-app/helpers"
	"serene-app/mail"
)

func NewService(m mail.Mailer) UserService {
	return &UserServiceImpl{m}
}

func (s *UserServiceImpl) SendEmailVerification(data User) error {
	html, _ := mail.GetEmailVerif(fmt.Sprintf("%s/user/verify?token=%s",
		os.Getenv("APPLICATION_BASE_URL"),
		h.GenerateJwtToken(data.Id, data.Username, data.Email, data.IsVerified),
	))
	msg := mail.NewMessage("Email Verification", html, []string{data.Email})
	return s.mailer.Send(msg)
}
