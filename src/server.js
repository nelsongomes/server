"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var post_customer_1 = require("./post-customer");
var get_customer_1 = require("./get-customer");
var hello_1 = require("./hello");
var list_customer_1 = require("./list-customer");
var openapi_1 = require("./openapi");
var PORT = 8000;
// Create a new express app instance
var app = express_1.default();
// add support for parsing json
app.use(express_1.default.json());
// declare our hello world api
hello_1.initHello(app, openapi_1.openApiInstance);
list_customer_1.initListCustomers(app, openapi_1.openApiInstance);
get_customer_1.initGetCustomer(app, openapi_1.openApiInstance);
post_customer_1.initPostCustomer(app, openapi_1.openApiInstance);
// initializes schema endpoint and UI
openapi_1.initOpenApi(app, openapi_1.openApiInstance);
app.listen(PORT, function () {
    console.log("Server is listening on port " + PORT + "!");
});
