import ErrorMessage = require("./error-message")

type ErrorResponse = {
    errors: ErrorMessage[]
}

export = ErrorResponse;