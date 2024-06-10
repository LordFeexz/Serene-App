package helpers

import "os"

func GetEnvOrDefault(key, defaultValue string) string {
	env := os.Getenv(key)
	if env == "" {
		return defaultValue
	}
	return env
}
