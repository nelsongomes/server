"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initOpenApi = exports.openApiInstance = void 0;
var ts_openapi_1 = require("ts-openapi");
var swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
// create an OpenApi instance to store definitions
exports.openApiInstance = new ts_openapi_1.OpenApi("v1.0", // API version
"Our Awesome Api", // API title
"Describing how to keep APIs documented.", // API description
"nelson.gomes@pipedrive.com" // API maintainer
);
// declare servers for the API
exports.openApiInstance.setServers([{ url: "http://localhost:8000" }]);
// set API license
exports.openApiInstance.setLicense("Apache License, Version 2.0", // API license name
"http://www.apache.org/licenses/LICENSE-2.0", // API license url
"http://dummy.io/terms/" // API terms of service
);
// declare security schemes available, each with an ID
exports.openApiInstance.declareSecurityScheme("bearerSecurity", ts_openapi_1.bearerAuth());
// declare global schemes (applicable to all methods)
exports.openApiInstance.addGlobalSecurityScheme("bearerSecurity");
function initOpenApi(app, openApi) {
    // generate our OpenApi schema
    var openApiJson = openApi.generateJson();
    // we'll create an endpoint to reply with openapi schema
    app.get("/openapi.json", function (_req, res) {
        res.json(openApiJson);
    });
    // this will make openapi UI available with our definition
    app.use("/api-docs", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(openApiJson));
}
exports.initOpenApi = initOpenApi;
