const globalErrorHandler = (error, request, response, next) => {
    const statusCode = error.statusCode || 500;
    const status = error.status || 'fail';

    response.status(statusCode).json({
        status,
        error: error,
        message: error.message,
        stack: error.stack,
    });
};

module.exports = { globalErrorHandler };
