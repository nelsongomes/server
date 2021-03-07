"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initHello = void 0;
var ts_openapi_1 = require("ts-openapi");
function hello(_request, response) {
    response.send("Hello World!");
}
function initHello(app, openApi) {
    app.get("/", hello);
    // declare our API
    openApi.addPath("/", // this is API path
    {
        // API method
        get: {
            description: "Hello world",
            summary: "Demo get request to show how to declare APIs",
            operationId: "get-hello-op",
            responses: {
                // here we declare the response types
                200: ts_openapi_1.textPlain("Successful Operation"),
            },
            tags: ["Dummy Apis"],
        },
    }, true // make method visible
    );
}
exports.initHello = initHello;
