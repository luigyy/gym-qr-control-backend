"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(statusObject, fieldsRequired) {
        super();
        this.statusCode = statusObject.code;
        this.message = statusObject.message;
        this.fieldsRequired = fieldsRequired;
    }
}
exports.default = HttpException;
//# sourceMappingURL=HttpException.js.map