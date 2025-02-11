import { OpenAPIRegistry, OpenApiGeneratorV3 } from "@asteasolutions/zod-to-openapi";

import { userRegistry } from "../routes/userRoutes";

export function generateOpenAPIDocument() {
  const registry = new OpenAPIRegistry([userRegistry]);
  const generator = new OpenApiGeneratorV3(registry.definitions);

  return generator.generateDocument({
    openapi: "3.0.0",
    info: {
      version: "1.0.0",
      title: "EBUDDY Technical Test",
    },
    externalDocs: {
      description: "Documentation for the API endpoints",
      url: "/swagger.json",
    },
  });
}
