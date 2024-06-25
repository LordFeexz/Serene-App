package helpers

import (
	"os"
	"path/filepath"
	cons "serene-app/constants"
	"serene-app/exceptions"
)

func FindOneSound(s string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", exceptions.NewError("gagal mendapat data direktori saat ini", 500)
	}

	sound, exists := cons.SOUND[s]
	if !exists {
		return "", exceptions.NewError("suara tidak ditemukan", 404)
	}

	return filepath.Join(pwd, "assets", "sounds", sound), nil
}
