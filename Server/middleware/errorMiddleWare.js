// ERROR MIDDLEWARE | NEXT FUNCTION

const errorMiddleWare = (err, req, res, next) => {
    const defaultError = {
        statusCode: 404,
        success: "failed",
        message: err
    };

    if(err.name === "ValidationError") {
        defaultError.statusCode = 400;

        defaultError.message = Object.values(err, errors).map((val) => val.message).join(", ");
    }

    if(err.code && err.code === 11000) {
        defaultError.statusCode = 404;

        defaultError.message = `${Object.values(err.keyValue)} is already taken`;
    }

    res.status(defaultError.statusCode).json({
        success: defaultError.success,
        message: defaultError.message
    });
}

export default errorMiddleWare;

