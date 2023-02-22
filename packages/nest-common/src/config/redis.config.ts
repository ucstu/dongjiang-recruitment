import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  RedisConfig,
  YamlConfiguration,
  YAML_CONFIG_FILENAME,
} from "./configuration.yaml";

export default registerAs<RedisConfig>("redis", () => {
  if (process.env.NODE_ENV === "production") {
    return {
      host: process.env.REDIS_HOST,
      port: +process.env.REDIS_PORT,
      database: +process.env.REDIS_DATABASE,
      password: process.env.REDIS_PASSWORD,
    };
  }
  return (
    yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as YamlConfiguration
  ).redis;
});
