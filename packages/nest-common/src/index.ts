import { Module } from "@nestjs/common";
import AuthModule from "./auth";
import ConfigModule from "./config";
import TransformModule from "./transform";
import TypeOrmModule from "./typeorm";

@Module({
  imports: [ConfigModule, TypeOrmModule, AuthModule, TransformModule],
})
export class CommonModule {}

export * from "./auth";
export * from "./config";
export * from "./transform";
export * from "./typeorm";
