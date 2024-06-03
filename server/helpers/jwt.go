package helpers

import (
	"os"
	"serene-app/exceptions"

	"github.com/golang-jwt/jwt/v4"
)

func GenerateJwtToken(id, username, email string, isVerified bool) string {
	token := jwt.NewWithClaims(jwt.SigningMethodES256, jwt.MapClaims{
		"id":         id,
		"username":   username,
		"email":      email,
		"isVerified": isVerified,
	})
	tokenStr, _ := token.SignedString([]byte(os.Getenv("SECRET_KEY")))

	return tokenStr
}

func VerifyToken(token string) (jwt.MapClaims, error) {
	var claim jwt.MapClaims
	payload, err := jwt.ParseWithClaims(token, &claim, func(t *jwt.Token) (interface{}, error) {
		return []byte(os.Getenv("SECRET_KEY")), nil
	})
	if err != nil || !payload.Valid {
		return nil, exceptions.NewError("missing or invalid token", 401)
	}
	return claim, nil
}
