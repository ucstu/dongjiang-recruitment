import databaseConfig, { DatabaseConfig } from "./database.config";

export interface Configuration {
  database: DatabaseConfig
}

export default [databaseConfig]
