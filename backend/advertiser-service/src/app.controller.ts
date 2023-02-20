import {
  IsInt,
  IsString,
} from "@dongjiang-recruitment/nest-common/dist/validation";
import { Body, Controller, Post } from "@nestjs/common";
import { AppService } from "./app.service";

class Test {
  @IsString()
  name: string;

  @IsInt()
  age: number;

  @IsString()
  breed: string;
}

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post()
  getHello(@Body() test: Test): string {
    return this.appService.getHello();
  }
}
