package exceptions

func PanicIfError(err error) {
	if err != nil {
		panic(err.Error())
	}
}

func NewError(msg string, code int) error {
	switch code {
	case 403:
		return &forbiddenError{msg, code}
	case 401:
		return &unauthorizedError{msg, code}
	case 404:
		return &dataNotFoundError{msg, code}
	case 409:
		return &conflictError{msg, code}
	case 502:
		return &badGatewayError{msg, code}
	case 400:
		return &badRequestError{msg, code}
	case 413:
		return &entityToLarge{msg, code}
	case 429:
		return &tooManyRequestError{msg, code}
	default:
		return &internalServerError{msg, 500}
	}
}

func GetErrorMsg(err error) (string, int) {
	switch e := err.(type) {
	case *forbiddenError:
		return e.msg, e.StatusCode
	case *unauthorizedError:
		return e.msg, e.StatusCode
	case *dataNotFoundError:
		return e.msg, e.StatusCode
	case *conflictError:
		return e.msg, e.StatusCode
	case *badGatewayError:
		return e.msg, e.StatusCode
	case *badRequestError:
		return e.msg, e.StatusCode
	case *entityToLarge:
		return e.msg, e.StatusCode
	case *tooManyRequestError:
		return e.msg, e.StatusCode
	default:
		return "Internal Server Error", 500
	}
}
