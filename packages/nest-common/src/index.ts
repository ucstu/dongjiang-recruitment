import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import configs from "./configs";

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [...configs],
      isGlobal: true,
      cache: true,
    }),
  ],
})
export class CommonModule {
}

export * from "@nestjs/config";
export * from "@nestjs/typeorm";
export * from "typeorm";
