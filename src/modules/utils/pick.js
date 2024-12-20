"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pick = (object, keys) => keys.reduce((obj, key) => {
    if (object && Object.prototype.hasOwnProperty.call(object, key)) {
        // eslint-disable-next-line no-param-reassign
        obj[key] = object[key];
    }
    return obj;
}, {});
exports.default = pick;
