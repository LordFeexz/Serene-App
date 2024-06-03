package helpers

import "golang.org/x/crypto/bcrypt"

func Hash(str string) (string, error) {
	hashed, err := bcrypt.GenerateFromPassword([]byte(str), bcrypt.DefaultCost)
	return string(hashed), err
}

func CompareHash(hash, str []byte) error {
	return bcrypt.CompareHashAndPassword(hash, str)
}
