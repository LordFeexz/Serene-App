package controllers

import (
	cons "serene-app/constants"
	"serene-app/web"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewTestController(w web.ResponseWriter, v *validator.Validate) TestController {
	return &TestControllerImpl{w, v}
}

func (ctr TestControllerImpl) GetMentalHealthQuestion(c *gin.Context) {
	ctr.WriteResponse(c, 200, "OK", cons.MENTAL_HEALTH_QUESTIONS)
}
