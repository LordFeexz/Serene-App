package helpers

import (
	"os"
	"path/filepath"
	"serene-app/exceptions"
)

func GetPdf() (string, error) {
	pwd, err := os.Getwd()
	if err != nil {
		return "", exceptions.NewError("gagal mendapat data direktori saat ini", 500)
	}

	return filepath.Join(pwd, "assets", "pdf", "Buku Saku.pdf"), nil
}
