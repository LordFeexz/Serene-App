package web

import (
	"fmt"
	"serene-app/exceptions"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

func NewResponseWriter() ResponseWriter {
	return &ResponseWriterImpl{}
}

func (w *ResponseWriterImpl) getStatusMessage(status int) string {
	statusMessages := map[int]string{
		100: "Continue",
		101: "Switching Protocols",
		102: "Processing",
		103: "Early Hints",
		200: "OK",
		201: "Created",
		202: "Accepted",
		203: "Non Authoritative Info",
		204: "No Content",
		205: "Reset Content",
		206: "Partial Content",
		207: "Multi Status",
		208: "Already Reported",
		226: "IM Used",
		300: "Multiple Choices",
		301: "Moved Permanently",
		302: "Found",
		303: "See Other",
		304: "Not Modified",
		305: "Use Proxy",
		307: "Temporary Redirect",
		308: "Permanent Redirect",
		400: "Bad Request",
		401: "Unauthorized",
		402: "Payment Required",
		403: "Forbidden",
		404: "Not Found",
		405: "Method Not Allowed",
		406: "Not Acceptable",
		407: "Proxy Auth Required",
		408: "Request Timeout",
		409: "Conflict",
		410: "Gone",
		411: "Length Required",
		412: "Precondition Failed",
		413: "Request Entity Too Large",
		414: "Request URI Too Long",
		415: "Unsupported Media Type",
		416: "Request Range Not Satisfiable",
		417: "Expectation Failed",
		418: "Teapot",
		421: "Misdirected Request",
		422: "Unprocessable Entity",
		423: "Locked",
		424: "Failed Dependency",
		425: "Too Early",
		426: "Upgrade Required",
		429: "Too Many Requests",
		431: "Request Header Fields Too Large",
		451: "Unavailable For Legal Reasons",
		500: "Internal Server Error",
		501: "Not Implemented",
		502: "Bad Gateway",
		503: "Service Unavailable",
		504: "Gateway Timeout",
		505: "HTTP Version Not Supported",
		506: "Variant Also Negotiates",
		507: "Insufficient Storage",
		508: "Loop Detected",
		510: "Not Extended",
		511: "Network Authentication Required",
	}

	return statusMessages[status]
}

func (w *ResponseWriterImpl) write(c *gin.Context, response WebResponse) {
	response.Status = w.getStatusMessage(response.Code)
	c.JSON(response.Code, response)
}

func (w *ResponseWriterImpl) AbortResponse(c *gin.Context, err error) {
	msg, code := exceptions.GetErrorMsg(err)

	c.AbortWithStatusJSON(code, WebResponse{
		Status:  w.getStatusMessage(code),
		Code:    code,
		Message: msg,
	})
}

func (w *ResponseWriterImpl) WriteResponse(c *gin.Context, code int, msg string, data any) {
	w.write(c, WebResponse{
		code,
		w.getStatusMessage(code),
		msg,
		data,
	})
}

func (w *ResponseWriterImpl) validatorMsg(f validator.FieldError) string {
	switch f.Tag() {
	case "required":
		return fmt.Sprintf("%s is required", f.Field())
	case "email":
		return "invalid email format"
	case "password":
		return "password must include upper case,lower case, number, and symbol"
	default:
		return f.Error()
	}
}

func (w *ResponseWriterImpl) WriteValidationErrResponse(c *gin.Context, err error) {
	errMap := make(map[string]string)
	for _, val := range err.(validator.ValidationErrors) {
		errMap[val.Field()] = w.validatorMsg(val)
	}

	c.AbortWithStatusJSON(400, WebResponse{
		Status:  w.getStatusMessage(400),
		Message: "validation error",
		Code:    400,
		Data:    errMap,
	})
}
