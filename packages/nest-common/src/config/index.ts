import { Module } from "@nestjs/common";
import { ConfigModule as _ConfigModule } from "@nestjs/config";
import authorizationConfig from "./authorization.config";
import databaseConfig from "./database.config";

@Module({
  imports: [
    _ConfigModule.forRoot({
      load: [databaseConfig, authorizationConfig],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export default class ConfigModule {}

export * from "@nestjs/config";
export * from "./authorization.config";
export * from "./configuration.yaml";
export * from "./database.config";
