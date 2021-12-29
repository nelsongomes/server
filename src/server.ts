import express, { Application } from "express";
import { initPostCustomer } from "./post-customer";
import { initGetCustomer } from "./get-customer";
import { initHello } from "./hello";
import { initListCustomers } from "./list-customer";
import { initOpenApi, openApiInstance } from "./openapi";
import { errorMiddleware } from "./middlewares/error";

const PORT = 8000;

// Create a new express app instance
const app: Application = express();
// add support for parsing json
app.use(express.json());

// declare our hello world api
initHello(app, openApiInstance);

initListCustomers(app, openApiInstance);
initGetCustomer(app, openApiInstance);
initPostCustomer(app, openApiInstance);

// initializes schema endpoint and UI
initOpenApi(app, openApiInstance);

app.use(errorMiddleware);

app.listen(PORT, function () {
  console.log(`Server is listening on port ${PORT}!`);
});
