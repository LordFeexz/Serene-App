package helpers

import (
	"math/rand"
	cons "serene-app/constants"
	"time"
)

func ValidMentalHealthQuestion(s string) bool {
	for _, val := range cons.MENTAL_HEALTH_QUESTIONS {
		if val == s {
			return true
		}
	}
	return false
}

func GetMentalHealthResult(point uint8) string {
	switch true {
	case point <= 3:
		return "Kesehatan Mental anda baik"
	case point >= 4 && point <= 6:
		return "Kesehatan mental anda perlu diperhatikan, gunakan fitur terapi untuk membantu merelaksasi diri anda"
	default:
		return "Segera cari bantuan"
	}
}

func GetRandomMotivation() string {
	return cons.MOTIVATION[rand.New(
		rand.NewSource(
			time.Now().Unix(),
		),
	).Intn(len(cons.MOTIVATION))]
}