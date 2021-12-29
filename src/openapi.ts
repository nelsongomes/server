import { Application } from "express";
import { bearerAuth, OpenApi } from "ts-openapi";
import swaggerUi from "swagger-ui-express";

// create an OpenApi instance to store definitions
export const openApiInstance = new OpenApi(
  "v1.0", // API version
  "Our Awesome Api", // API title
  "Describing how to keep APIs documented.", // API description
  "nelson.gomes@pipedrive.com" // API maintainer
);

// declare servers for the API
openApiInstance.setServers([{ url: "http://localhost:8000" }]);

// set API license
openApiInstance.setLicense(
  "Apache License, Version 2.0", // API license name
  "http://www.apache.org/licenses/LICENSE-2.0", // API license url
  "http://dummy.io/terms/" // API terms of service
);

// declare security schemes available, each with an ID
openApiInstance.declareSecurityScheme("bearerSecurity", bearerAuth());
// declare global schemes (applicable to all methods)
openApiInstance.addGlobalSecurityScheme("bearerSecurity");

export function initOpenApi(app: Application, openApi: OpenApi) {
  // generate our OpenApi schema
  const openApiJson = openApi.generateJson();

  // we'll create an endpoint to reply with openapi schema
  app.get("/openapi.json", function (_req, res) {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    res.setHeader("Expires", "0");
    res.json(openApiJson);
  });
  // this will make openapi UI available with our definition
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(openApiJson));
}
