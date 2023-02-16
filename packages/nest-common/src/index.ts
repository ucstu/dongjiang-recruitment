import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import configs, { Configuration } from "./configurations";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configs],
      isGlobal: true,
      cache: true,
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory(configService: ConfigService<Configuration, true>) {
        return {
          type: configService.get("database.type", { infer: true }),
          host: configService.get("database.host", { infer: true }),
          port: configService.get("database.port", { infer: true }),
          username: configService.get("database.username", { infer: true }),
          password: configService.get("database.password", {
            infer: true,
          }),
          database: configService.get("database.database", {
            infer: true,
          }),
        };
      },
    }),
  ],
})
export class CommonModule {}

export * from "@nestjs/config";
export * from "@nestjs/typeorm";
export * from "typeorm";
