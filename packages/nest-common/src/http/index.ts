import { Module } from "@nestjs/common";
import { HttpModule as _HttpModule } from "./HttpModule";

@Module({
  imports: [_HttpModule],
})
export default class HttpModule {}

export * from "@nestjs/axios";
export * from "axios";
