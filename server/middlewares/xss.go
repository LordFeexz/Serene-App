package middlewares

import (
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/microcosm-cc/bluemonday"
)

func (m *MiddlewaresImpl) XSSProtection() gin.HandlerFunc {
	policy := bluemonday.UGCPolicy()
	return func(c *gin.Context) {
		if c.Request.Method == http.MethodPost || c.Request.Method == http.MethodPut {
			c.Request.ParseForm()

			for key, values := range c.Request.PostForm {
				for i, value := range values {
					c.Request.PostForm[key][i] = policy.Sanitize(value)
				}
			}
		} else if c.Request.Method == http.MethodGet {
			query := c.Request.URL.Query()
			for key, values := range query {
				for i, value := range values {
					query[key][i] = policy.Sanitize(value)
				}
			}
			c.Request.URL.RawQuery = query.Encode()
		}

		c.Next()
	}
}
