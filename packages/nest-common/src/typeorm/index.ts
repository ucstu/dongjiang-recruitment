import { Module } from "@nestjs/common";
import { ConfigType } from "@nestjs/config";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";
import _databaseConfig from "../config/database.config";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [_databaseConfig.KEY],
      useFactory(databaseConfig: ConfigType<typeof _databaseConfig>) {
        return {
          type: databaseConfig.type,
          host: databaseConfig.host,
          port: databaseConfig.port,
          username: databaseConfig.username,
          password: databaseConfig.password,
          database: databaseConfig.database,
        } as TypeOrmModuleOptions;
      },
    }),
  ],
})
export default class {}

export * from "@nestjs/typeorm";
export * from "typeorm";
