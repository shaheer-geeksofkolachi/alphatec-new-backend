"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePassword = exports.generateRandomOTPNumber = exports.generateRandomString = exports.comparePassword = exports.createHashPassword = void 0;
const bcrypt = require("bcrypt");
const createHashPassword = async (password) => {
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltOrRounds);
    return hashedPassword;
};
exports.createHashPassword = createHashPassword;
const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};
exports.comparePassword = comparePassword;
const generateRandomString = (length = 10) => Array.from({ length }, () => 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?'[Math.floor(Math.random() * 84)]).join('');
exports.generateRandomString = generateRandomString;
const generateRandomOTPNumber = (length) => {
    if (!Number.isInteger(length) || length <= 0) {
        throw new Error('Length must be a positive integer');
    }
    let otp = '';
    for (let i = 0; i < length; i++) {
        otp += Math.floor(Math.random() * 10);
    }
    return otp;
};
exports.generateRandomOTPNumber = generateRandomOTPNumber;
const generatePassword = () => {
    return (0, exports.generateRandomString)(10);
};
exports.generatePassword = generatePassword;
//# sourceMappingURL=auth.util.js.map