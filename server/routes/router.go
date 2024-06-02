package routes

import "github.com/gin-gonic/gin"

func NewRoutes() func(addr ...string) error {
	r := router{gin.Default()}
	r.Use(gin.Recovery())

	return r.Run
}
