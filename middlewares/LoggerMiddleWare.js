const loggerMiddleware = (req, res, next) => {
    console.log(`Incoming Request: ${req.method} ${req.url}`);
    next();
};

export default loggerMiddleware;
