package mail

import (
	"io"
	"os"
	"path/filepath"
	"strings"

	"gopkg.in/gomail.v2"
)

type sender struct{ *gomail.Dialer }

type Mailer interface {
	Send(*gomail.Message) error
}

func NewSender() Mailer {
	return &sender{gomail.NewDialer(
		os.Getenv("SMTP_HOST"),
		587,
		os.Getenv("SMTP_EMAIL"),
		os.Getenv("SMTP_PASSWORD"),
	)}
}

func (s *sender) Send(msg *gomail.Message) error {
	return s.DialAndSend(msg)
}

func NewMessage(sub, html string, to []string) *gomail.Message {
	mailer := gomail.NewMessage()
	mailer.SetHeader("From", os.Getenv("SMTP_EMAIL"))
	mailer.SetHeader("To", to...)
	mailer.SetHeader("Subject", sub)
	mailer.SetBody("text/html", html)

	return mailer
}

func GetEmailVerif(url string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", err
	}

	file, err := os.Open(filepath.Join(pwd, "mail", "assets", "email-verification.html"))
	if err != nil {
		return "", err
	}
	defer file.Close()

	content, err := io.ReadAll(file)
	if err != nil {
		return "", err
	}

	return strings.ReplaceAll(string(content), "[URL]", url), nil
}
