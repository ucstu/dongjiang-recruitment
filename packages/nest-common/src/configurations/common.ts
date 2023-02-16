import { resolve } from "node:path";
import { AuthorizationConfig } from "./authorization.config";
import { DatabaseConfig } from "./database.config";

export interface Configuration {
  database: DatabaseConfig;
  authorization: AuthorizationConfig;
}

export const YAML_CONFIG_FILENAME = resolve(
  __dirname,
  "../../",
  "config.local.yaml"
);
