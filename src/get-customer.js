"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initGetCustomer = void 0;
var ts_openapi_1 = require("ts-openapi");
var openapi_functions_1 = require("ts-openapi/lib/openapi/openapi-functions");
var common_1 = require("./common");
// body response schema
var responseSchema = {
    id: ts_openapi_1.Types.Uuid({ description: "Customer ID" }),
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
function getCustomer(_request, response) {
    response.send({
        id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        name: "customer name",
        type: common_1.CustomerType.Platinum,
        birthdate: "2021-02-04",
    });
}
function initGetCustomer(app, openApi) {
    // declare route to express
    app.get("/customer/:id", getCustomer);
    // declare openAPI schema
    openApi.addPath("/customer/:id", {
        get: {
            summary: "Get a customer data",
            description: "This operation retrieves customer information",
            operationId: "get-customer-op",
            requestSchema: {
                params: {
                    id: ts_openapi_1.Types.Uuid({
                        description: "Customer ID",
                        required: true,
                        example: "37237d6a-bb7e-459a-b75d-d1733210ad5c",
                    }),
                },
            },
            tags: ["Customer Operations"],
            responses: {
                200: openapi_functions_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Successful Operation",
                    properties: responseSchema,
                })),
                400: common_1.errorSchema("Bad Request"),
            },
        },
    }, true);
}
exports.initGetCustomer = initGetCustomer;
