import { resolve } from "node:path";

export const YAML_CONFIG_FILENAME = resolve(
  __dirname,
  "../../",
  "config.local.yaml"
);

export interface DatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface AuthorizationConfig {
  secret: string;
  expiresIn: string;
}

export interface YamlConfiguration {
  database: DatabaseConfig;
  authorization: AuthorizationConfig;
}
