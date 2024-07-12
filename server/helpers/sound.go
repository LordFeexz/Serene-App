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

	for _, val := range cons.SOUND_DATAS {
		if val.Title == s {
			return filepath.Join(pwd, "assets", "sounds", val.Sound), nil
		}
	}
	return "", exceptions.NewError("suara tidak ditemukan", 404)
}

func FindOneSoundImage(s string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", exceptions.NewError("gagal mendapat data direktori saat ini", 500)
	}

	for _, val := range cons.SOUND_DATAS {
		if val.Title == s {
			return filepath.Join(pwd, "assets", "images", val.Image), nil
		}
	}
	return "", exceptions.NewError("gambar tidak ditemukan", 404)
}
