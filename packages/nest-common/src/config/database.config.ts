import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  DatabaseConfig,
  YamlConfiguration,
  YAML_CONFIG_FILENAME,
} from "./configuration.yaml";

export default registerAs<DatabaseConfig>("database", () => {
  if (process.env.NODE_ENV === "production") {
    return {
      type: process.env.DB_TYPE,
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    };
  }
  return (
    yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as YamlConfiguration
  ).database;
});
