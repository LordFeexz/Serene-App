package middlewares

import (
	"serene-app/pkg/user"
	"serene-app/web"
)

func New(w web.ResponseWriter, userRepo user.UserRepo) Middlewares {
	return &MiddlewaresImpl{w, userRepo}
}
