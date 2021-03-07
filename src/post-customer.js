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
exports.initPostCustomer = void 0;
var ts_openapi_1 = require("ts-openapi");
var openapi_functions_1 = require("ts-openapi/lib/openapi/openapi-functions");
var common_1 = require("./common");
function create(request, response) {
    if (!request.headers.authorization) {
        response.status(401).send({
            message: "Unauthorized",
            code: 401,
        });
    }
    else {
        response.status(201).send(__assign({ id: "3fa85f64-5717-4562-b3fc-2c963f66afa6" }, request.body));
    }
}
function initPostCustomer(app, openApi) {
    initCreate(app, openApi);
}
exports.initPostCustomer = initPostCustomer;
function initCreate(app, openApi) {
    app.post("/customer", create);
    var commonProperties = {
        name: ts_openapi_1.Types.String({
            description: "Customer name",
            maxLength: 100,
            required: true,
        }),
        type: ts_openapi_1.Types.StringEnum({
            values: Object.values(common_1.CustomerType),
            description: "Customer Type",
        }),
        birthdate: ts_openapi_1.Types.Date({ description: "Birthdate" }),
    };
    openApi.addPath("/customer", {
        post: {
            summary: "Create customer",
            description: "This operation creates a new customer",
            operationId: "post-customer-op",
            requestSchema: {
                headers: {
                    requestId: ts_openapi_1.Types.Uuid({
                        description: "Request ID",
                        required: false,
                        example: "b710e129-4e2c-4448-b605-73b18d297bae",
                    }),
                },
                body: ts_openapi_1.Types.Object({
                    description: "Customer data to create",
                    properties: commonProperties,
                }),
            },
            tags: ["Customer Operations"],
            responses: {
                201: openapi_functions_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Created",
                    properties: __assign({ id: ts_openapi_1.Types.Uuid({ description: "Customer ID" }) }, commonProperties),
                    example: {
                        id: "b710e129-4e2c-4448-b605-73b18d297bae",
                        name: "Customer Name",
                        type: common_1.CustomerType.Platinum,
                        birthdate: "2020-12-30",
                    },
                })),
                400: common_1.errorSchema("Bad Request"),
                401: common_1.errorSchema("Unauthorized"),
            },
        },
    }, true);
}
