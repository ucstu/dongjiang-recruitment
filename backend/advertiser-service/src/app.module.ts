import {
  CommonModule,
  TypeOrmModule,
} from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { ModuleRef } from "@nestjs/core";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: "postgres",
        host: "localhost",
        port: 3306,
        username: "root",
        password: "root",
        database: "test",
        entities: [],
        synchronize: true,
      }),
      inject: [ModuleRef],
    }),
    CommonModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
