"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.responseSchema = exports.errorSchema = exports.CustomerType = void 0;
var ts_openapi_1 = require("ts-openapi");
var CustomerType;
(function (CustomerType) {
    CustomerType["Platinum"] = "platinum";
    CustomerType["Gold"] = "gold";
    CustomerType["Silver"] = "silver";
})(CustomerType = exports.CustomerType || (exports.CustomerType = {}));
function errorSchema(description) {
    return ts_openapi_1.bodySchema(ts_openapi_1.Types.Object({
        description: description,
        properties: {
            message: ts_openapi_1.Types.String({ description: "Error message" }),
            code: ts_openapi_1.Types.Integer({ description: "Error code" }),
        },
    }));
}
exports.errorSchema = errorSchema;
exports.responseSchema = {
    id: ts_openapi_1.Types.Uuid({ description: "Customer ID" }),
    name: ts_openapi_1.Types.String({
        description: "Customer name",
        maxLength: 100,
        required: true,
    }),
    type: ts_openapi_1.Types.StringEnum({
        values: Object.values(CustomerType),
        description: "Customer Type",
    }),
    birthdate: ts_openapi_1.Types.Date({ description: "Birthdate" }),
};
