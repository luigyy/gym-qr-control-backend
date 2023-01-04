"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const NotFoundHandler = (_, res, __) => {
    const response = {
        statusCode: 404,
        error: true,
        message: "Endpoint not found",
    };
    res.status(404).json(response);
};
exports.default = NotFoundHandler;
//# sourceMappingURL=NotFoundHandler.js.map