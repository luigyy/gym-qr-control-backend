"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const errorHandler = (err, _, res, __) => {
    const response = {
        statusCode: err.statusCode,
        error: true,
        message: err.message,
    };
    if (err.fieldsRequired)
        response.fieldsRequired = err.fieldsRequired;
    res.status(err.statusCode).json(response);
};
exports.default = errorHandler;
//# sourceMappingURL=errorHandler.js.map