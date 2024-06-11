package helpers

import (
	cons "serene-app/constants"
	"serene-app/exceptions"
)

func FindOneTherapyVideo(v string) (cons.TherapyVideo, error) {
	for _, val := range cons.THERAPY_VIDEOS {
		if val.V == v {
			return val, nil
		}
	}
	return cons.TherapyVideo{}, exceptions.NewError("video tidak ditemukan", 404)
}
