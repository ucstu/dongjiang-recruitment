import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
import { Controller, Get, Query } from "@nestjs/common";
import { CommonService } from "./common.service";

@Controller()
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Public()
  @Get("/verificationCode")
  getVerificationCode(@Query("email") email: string) {
    return this.commonService.getVerificationCode(email);
  }
}
