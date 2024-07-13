package exceptions

type badRequestError struct {
	msg        string
	StatusCode int
}

type entityToLarge struct {
	msg        string
	StatusCode int
}

type forbiddenError struct {
	msg        string
	StatusCode int
}

type internalServerError struct {
	msg        string
	StatusCode int
}

type unauthorizedError struct {
	msg        string
	StatusCode int
}

type dataNotFoundError struct {
	msg        string
	StatusCode int
}

type conflictError struct {
	msg        string
	StatusCode int
}

type badGatewayError struct {
	msg        string
	StatusCode int
}

type tooManyRequestError struct {
	msg        string
	StatusCode int
}
