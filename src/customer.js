"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initCustomer = void 0;
var ts_openapi_1 = require("ts-openapi");
var openapi_functions_1 = require("ts-openapi/lib/openapi/openapi-functions");
var CustomerType;
(function (CustomerType) {
    CustomerType["Platinum"] = "platinum";
    CustomerType["Gold"] = "gold";
    CustomerType["Silver"] = "silver";
})(CustomerType || (CustomerType = {}));
function create(request, response) {
    response.send(__assign({ id: "new client id" }, request.body));
}
function initCustomer(app, openApi) {
    initCreate(app, openApi);
}
exports.initCustomer = initCustomer;
function initCreate(app, openApi) {
    app.post("/customer", create);
    var errorStructure = openapi_functions_1.bodySchema(ts_openapi_1.Types.Object({
        description: "Bad request",
        properties: {
            message: ts_openapi_1.Types.String({ description: "Error message" }),
            code: ts_openapi_1.Types.Integer({ description: "Error code" }),
        },
    }));
    var commonProperties = {
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
    openApi.addPath("/customer", {
        post: {
            summary: "Create customer",
            description: "This operation creates a new customer",
            operationId: "post-customer-op",
            validationSchema: {
                body: ts_openapi_1.Types.Object({
                    description: "Customer data to create",
                    properties: __assign({}, commonProperties),
                }),
            },
            tags: ["Customer Operations"],
            responses: {
                201: openapi_functions_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Successful Operation",
                    properties: __assign({ id: ts_openapi_1.Types.Uuid({ description: "Customer ID" }) }, commonProperties),
                })),
                400: errorStructure,
            },
        },
    }, true);
}
