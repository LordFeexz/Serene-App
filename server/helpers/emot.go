package helpers

import (
	"os"
	"path/filepath"
	cons "serene-app/constants"
	"serene-app/exceptions"
)

func GetEmotImg(name string) (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", exceptions.NewError("failed to get pwd", 500)
	}

	filename, exists := cons.EMOTEMAP[name]
	if !exists {
		return "", exceptions.NewError("emote tidak ditemukan", 404)
	}

	return filepath.Join(pwd, "assets", filename), nil
}
