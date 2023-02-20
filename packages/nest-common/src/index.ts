import { DynamicModule, Module } from "@nestjs/common";
import AuthModule, { AuthOption } from "./auth";
import ConfigModule from "./config";
import TransformModule from "./transform";
import TypeOrmModule from "./typeorm";
import ValidationModule from "./validation";

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule,
    AuthModule,
    ValidationModule,
    TransformModule,
  ],
})
export class CommonModule {
  static forRoot(options?: { auth?: AuthOption }): DynamicModule {
    return {
      module: CommonModule,
      imports: [
        ConfigModule,
        TypeOrmModule,
        AuthModule.forRoot(options?.auth),
        ValidationModule,
        TransformModule,
      ],
    };
  }
}
