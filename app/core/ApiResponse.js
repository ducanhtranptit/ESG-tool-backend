const apiStatusCode = {
    SUCCESS: 200,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    INTERNAL_ERROR: 500,
};

const apiMessage = {
    SUCCESS: "Success",
    BAD_REQUEST: "Bad request",
    UNAUTHORIZED: "Unauthorized",
    FORBIDDEN: "Forbidden",
    NOT_FOUND: "Not found",
    INTERNAL_ERROR: "Internal server error",
};

class SuccessResponse {
    send(req, res, data = {}) {
        return res.status(apiStatusCode.SUCCESS).json({
            status: apiStatusCode.SUCCESS,
            message: apiMessage.SUCCESS,
            data: data,
        });
    }
}

class BadRequestResponse {
    send(req, res) {
        return res.status(apiStatusCode.BAD_REQUEST).json({
            status: apiStatusCode.BAD_REQUEST,
            message: apiMessage.BAD_REQUEST,
        });
    }
}

class UnauthorizedResponse {
    send(req, res) {
        return res.status(apiStatusCode.UNAUTHORIZED).json({
            status: apiStatusCode.UNAUTHORIZED,
            message: apiMessage.UNAUTHORIZED,
        });
    }
}

class ForbiddenResponse {
    send(req, res) {
        return res.status(apiStatusCode.FORBIDDEN).json({
            status: apiStatusCode.FORBIDDEN,
            message: apiMessage.FORBIDDEN,
        });
    }
}

class NotFoundResponse {
    send(req, res) {
        return res.status(apiStatusCode.NOT_FOUND).json({
            status: apiStatusCode.NOT_FOUND,
            message: apiMessage.NOT_FOUND,
        });
    }
}

class ErrorResponse {
    send(req, res) {
        return res.status(apiStatusCode.INTERNAL_ERROR).json({
            status: apiStatusCode.INTERNAL_ERROR,
            message: apiMessage.INTERNAL_ERROR,
        });
    }
}

module.exports = {
    SuccessResponse,
    BadRequestResponse,
    UnauthorizedResponse,
    ForbiddenResponse,
    NotFoundResponse,
    ErrorResponse,
};
