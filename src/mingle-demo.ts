import express, { Application, Request, Response } from "express";
import swaggerUi from "swagger-ui-express";

import { OpenApiMingle, OpenApiSchema, ServiceList } from "ts-openapi";

const PORT = 8888;
const REFRESH_SECONDS = 60;
const API_PATH = "/api";
const OPENAPIJSON = `${API_PATH}/openapi.json`;

// this function can fetch services dinamically if needed
async function getServices(): Promise<ServiceList> {
  return {
    users: {
      schemaUrl:
        "file://../ts-openapi/test/unit/openapi-mingle/samples/sample1.json",
      publicPrefix: "/users/",
      privatePrefix: "/public/",
      type: "consul",
    },
    demo: {
      schemaUrl: "https://generator3.swagger.io/openapi.json",
      publicPrefix: "/openapi/",
      privatePrefix: "/",
      type: "consul",
    },
  };
}

// tslint:disable:no-console
// log function to pass to mingle class
function log(message: string, e?: Error) {
  if (e) {
    console.log(message, e);
  } else {
    console.log(message);
  }
}
// tslint:enable:no-console

async function getMingledApi(): Promise<OpenApiSchema> {
  const serviceMingle = new OpenApiMingle(
    "1.0.0",
    "Awesome API Explorer",
    "Demo for combining multiple service definitions into a public API",
    "nelson.ricardo.gomes@gmail.com",
    log
  );

  serviceMingle.setLicense("license", "http://license", "http://terms");

  serviceMingle.setServers([
    { url: "https://explorer-eu.awesome-api.com" },
    { url: "https://explorer-us.awesome-api.com" },
  ]);

  await serviceMingle.combineServices(await getServices());

  return serviceMingle.generateJson() as OpenApiSchema;
}

async function init() {
  const app: Application = express();

  // read initial schema
  let currentSchema = await getMingledApi();

  // creates an endpoint to reply with openapi schema
  app.get(OPENAPIJSON, function (_req, res) {
    res.setHeader("Cache-Control", "no-store, must-revalidate");
    res.setHeader("Expires", "0");
    res.json(currentSchema);
  });

  const options = {
    swaggerOptions: {
      url: OPENAPIJSON,
    },
  };

  // this will make openapi UI available with our definition
  app.use(
    "/api",
    swaggerUi.serveFiles(undefined, options),
    swaggerUi.setup(undefined, options)
  );

  // try to refresh schema every X seconds
  setInterval(async () => {
    try {
      currentSchema = await getMingledApi();
    } catch (e) {
      // log any errors during service mingle attempt plus failed attempts should
      // not crash server because we keep state from latest attempt
    }
  }, REFRESH_SECONDS * 1000);

  // start server
  app.listen(PORT, function () {
    console.log(
      `Server is listening on port ${PORT}! Click http://127.0.0.1:${PORT}/api/`
    );
  });
}

init();
