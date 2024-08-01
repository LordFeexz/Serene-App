package helpers

import (
	"math/rand"
	cons "serene-app/constants"
	"time"
)

func GetMentalHealthQuestionPoint(s string) (uint8, bool) {
	for _, val := range cons.MENTAL_HEALTH_QUESTIONS {
		if val.Question == s {
			return val.Point, true
		}
	}
	return 0, false
}

func GetMentalHealthResult(point uint8) string {
	switch true {
	case point == 0:
		return "Kesehatan Mental anda baik"
	case point >= 1 && point <= 4:
		return "Kesehatan mental anda perlu diperhatikan, gunakan fitur terapi untuk membantu merelaksasi diri anda"
	default:
		return "Segera cari bantuan konsultasi dokter/psikolog"
	}
}

func GetRandomMotivation() string {
	return cons.MOTIVATION[rand.New(
		rand.NewSource(
			time.Now().Unix(),
		),
	).Intn(len(cons.MOTIVATION))]
}
