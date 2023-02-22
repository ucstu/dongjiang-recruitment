import { registerAs } from "@nestjs/config";
import * as yaml from "js-yaml";
import { readFileSync } from "node:fs";
import {
  MailerConfig,
  YamlConfiguration,
  YAML_CONFIG_FILENAME,
} from "./configuration.yaml";

export default registerAs<MailerConfig>("mailer", () => {
  if (process.env.NODE_ENV === "production") {
    return {
      host: process.env.M_HOST,
      port: +process.env.M_PORT,
      secure: process.env.M_SECURE === "true",
      domain: process.env.M_DOMAIN,
      auth: {
        user: process.env.M_USER,
        pass: process.env.M_PASS,
      },
    };
  }
  return (
    yaml.load(readFileSync(YAML_CONFIG_FILENAME, "utf8")) as YamlConfiguration
  ).mailer;
});
