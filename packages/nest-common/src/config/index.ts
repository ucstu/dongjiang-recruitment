import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import authorizationConfig from "./authorization.config";
import databaseConfig from "./database.config";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [databaseConfig, authorizationConfig],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export default class {}

export * from "@nestjs/config";
export * from "./authorization.config";
export * from "./configuration.yaml";
export * from "./database.config";
