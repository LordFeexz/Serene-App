package validator

import (
	"regexp"

	"github.com/go-playground/validator/v10"
)

func New() *validator.Validate {
	v := validator.New()

	v.RegisterValidation("password", passwordValidation)
	return v
}

func passwordValidation(fl validator.FieldLevel) bool {
	password := fl.Field().String()
	var (
		uppercase   = regexp.MustCompile(`[A-Z]`)
		lowercase   = regexp.MustCompile(`[a-z]`)
		digit       = regexp.MustCompile(`\d`)
		specialChar = regexp.MustCompile(`[\W_]`)
	)

	return uppercase.MatchString(password) &&
		lowercase.MatchString(password) &&
		digit.MatchString(password) &&
		specialChar.MatchString(password)
}
