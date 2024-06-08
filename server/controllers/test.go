package controllers

import (
	"context"
	"fmt"
	cons "serene-app/constants"
	"serene-app/exceptions"
	h "serene-app/helpers"
	"serene-app/pkg/history"
	"serene-app/pkg/user"
	"serene-app/web"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewTestController(w web.ResponseWriter, v *validator.Validate, userService user.UserService, historyRepo history.HistoryRepo) TestController {
	return &TestControllerImpl{w, v, userService, historyRepo}
}

func (ctr *TestControllerImpl) GetMentalHealthQuestion(c *gin.Context) {
	ctr.WriteResponse(c, 200, "OK", cons.MENTAL_HEALTH_QUESTIONS)
}

func (ctr *TestControllerImpl) MentalHealthResult(c *gin.Context) {
	var body web.MentalHealthAnswer
	c.ShouldBind(&body)

	if err := ctr.validate.Struct(&body); err != nil {
		ctr.WriteValidationErrResponse(c, err)
		return
	}

	if len(body.Result) != len(cons.MENTAL_HEALTH_QUESTIONS) {
		ctr.AbortResponse(c, exceptions.NewError(fmt.Sprintf("jumlah jawaban harus %d", len(cons.MENTAL_HEALTH_QUESTIONS)), 400))
		return
	}

	if body.HasDuplicateQuestion() {
		ctr.AbortResponse(c, exceptions.NewError("ada pertanyaan yang terduplikasi", 400))
		return
	}

	var result uint8 = 0
	for _, val := range body.Result {
		if !h.ValidMentalHealthQuestion(val.Question) {
			ctr.AbortResponse(c, exceptions.NewError(fmt.Sprintf("pertanyaan '%s' tidak terdaftar", val.Question), 400))
			return
		}

		if val.UserAnswer {
			result++
		}
	}

	messageResult := h.GetMentalHealthResult(result)
	go ctr.historyRepo.Create(context.Background(), &history.History{
		FeatureUsed: history.MENTAL_HEALTH_TEST,
		Description: fmt.Sprintf("mental health test dengan hasil: '%s'", messageResult),
		UserId:      ctr.userService.GetUserFromRequestCtx(c).Id,
		CreatedAt:   time.Now(),
		UpdatedAt:   time.Now(),
	})
	var motivation string
	if result >= 7 {
		motivation = h.GetRandomMotivation()
	}
	//ASK mau di batasi ga per hari?

	ctr.WriteResponse(c, 200, messageResult, motivation)
}
