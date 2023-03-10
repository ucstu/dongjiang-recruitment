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

export interface MailerConfig {
  host: string;
  port: number;
  secure: boolean;
  domain: string;
  auth: {
    user: string;
    pass: string;
  };
}

export interface RedisConfig {
  host: string;
  port: number;
  database: number;
  password: string;
}

export interface YamlConfiguration {
  database: DatabaseConfig;
  authorization: AuthorizationConfig;
  mailer: MailerConfig;
  redis: RedisConfig;
}
