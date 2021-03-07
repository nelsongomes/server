"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initListCustomers = void 0;
var ts_openapi_1 = require("ts-openapi");
var openapi_functions_1 = require("ts-openapi/lib/openapi/openapi-functions");
var common_1 = require("./common");
function listCustomers(request, response) {
    var records = [];
    for (var i = 0; i < Number(request.query.records); i++) {
        records.push({
            id: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            name: "customer name",
            type: common_1.CustomerType.Platinum,
            birthdate: "2021-02-04",
        });
    }
    response.send({ data: records });
}
function initListCustomers(app, openApi) {
    // declare route to express
    app.get("/customer/list", listCustomers);
    // declare openAPI schema
    openApi.addPath("/customer/list", {
        get: {
            summary: "Get a page of customer data",
            description: "This operation return an array of customer information",
            operationId: "list-customer-op",
            requestSchema: {
                query: {
                    page: ts_openapi_1.Types.Integer({
                        description: "Page number",
                        default: 0,
                        minValue: 0,
                    }),
                    records: ts_openapi_1.Types.Integer({
                        description: "Records per page",
                        default: 10,
                        minValue: 10,
                        maxValue: 100,
                        required: true,
                    }),
                    types: ts_openapi_1.Types.Array({
                        arrayType: ts_openapi_1.Types.StringEnum({
                            values: Object.values(common_1.CustomerType),
                        }),
                    }),
                },
            },
            tags: ["Customer Operations"],
            responses: {
                200: openapi_functions_1.bodySchema(ts_openapi_1.Types.Object({
                    description: "Successful Operation",
                    properties: {
                        data: ts_openapi_1.Types.Array({
                            description: "An array of customers",
                            arrayType: ts_openapi_1.Types.Object({
                                description: "Customer detail",
                                properties: common_1.responseSchema,
                            }),
                        }),
                    },
                })),
                400: common_1.errorSchema("Bad Request"),
            },
        },
    }, true);
}
exports.initListCustomers = initListCustomers;
