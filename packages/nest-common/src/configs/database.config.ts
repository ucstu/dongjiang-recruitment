import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

const YAML_CONFIG_FILENAME = resolve(__dirname, "../../", "config.local.yaml");

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  name: string;
}

export default registerAs<DatabaseConfig>("database", () => {
  if (process.env.NODE_ENV === "production") {
    return {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      name: process.env.DB_NAME,
    };
  }
  return yaml.load(
    readFileSync(YAML_CONFIG_FILENAME, "utf8")
  ) as DatabaseConfig
});
