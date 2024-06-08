package web

import "github.com/gin-gonic/gin"

type ResponseWriter interface {
	AbortResponse(c *gin.Context, err error)
	WriteResponse(c *gin.Context, code int, msg string, data any)
	WriteValidationErrResponse(c *gin.Context, err error)
}

type ResponseWriterImpl struct{}

type webResponse struct {
	Code    int    `json:"code"`
	Status  string `json:"status"`
	Message string `json:"message"`
	Data    any    `json:"data"`
}
