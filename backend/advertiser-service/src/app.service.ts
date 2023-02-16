import { ConfigService } from "@dongjiang-recruitment/nest-common";
import { Injectable } from "@nestjs/common";

@Injectable()
export class AppService {
  constructor(private readonly configService: ConfigService) {}
  getHello(): string {
    return `Hello World!${this.configService.get<string>("database1")}`;
  }
}
