import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  AuthorizationConfig,
  YamlConfiguration,
  YAML_CONFIG_FILENAME,
} from "./configuration.yaml";

export default registerAs<AuthorizationConfig>("authorization", () => {
  if (process.env.NODE_ENV === "production") {
    return {
      secret: process.env.AUTH_SECRET,
      expiresIn: process.env.EXPIRESIN,
    };
  }
  return (
    yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as YamlConfiguration
  ).authorization;
});
