"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMonthFunction = void 0;
/**
 *
 * @param lastRenewal date of membership expiration
 * @returns new date of membership expiration
 */
const addMonthFunction = (expiresIn) => {
    //if no membership yet
    if (!expiresIn) {
        const newExpireDate = new Date();
        newExpireDate.setDate(newExpireDate.getDate() + 30);
        return newExpireDate;
    }
    //check if membership already expired
    if (new Date() < expiresIn) {
        //not yet expired,
        //create new expire date
        const newExpireDate = expiresIn;
        newExpireDate.setDate(expiresIn.getDate() + 30);
        return newExpireDate;
    }
    const newExpireDate = new Date();
    newExpireDate.setDate(newExpireDate.getDate() + 30);
    return newExpireDate;
};
exports.addMonthFunction = addMonthFunction;
//# sourceMappingURL=MembershipDateHandler.js.map