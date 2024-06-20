package exceptions

func (err *forbiddenError) Error() string {
	return err.msg
}

func (err *internalServerError) Error() string {
	return err.msg
}

func (err *unauthorizedError) Error() string {
	return err.msg
}

func (err *dataNotFoundError) Error() string {
	return err.msg
}

func (err *conflictError) Error() string {
	return err.msg
}

func (err *badGatewayError) Error() string {
	return err.msg
}

func (err *badRequestError) Error() string {
	return err.msg
}

func (err *entityToLarge) Error() string {
	return err.msg
}

func (err *tooManyRequestError) Error() string {
	return err.msg
}
