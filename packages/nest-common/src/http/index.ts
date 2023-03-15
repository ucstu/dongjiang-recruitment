import { Module } from "@nestjs/common";
import { ClientModule } from "./ClientModule";
import { HttpModule as _HttpModule } from "./HttpModule";

@Module({
  imports: [_HttpModule, ClientModule],
})
export default class HttpModule {}

export * from "./ClientModule";
export * from "./HttpModule";
