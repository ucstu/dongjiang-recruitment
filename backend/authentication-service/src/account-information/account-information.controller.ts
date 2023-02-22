import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { AccountInformationService } from "./account-information.service";
import { CreateAccountInformationDto } from "./dto/create-account-information.dto";
import { UpdateAccountInformationDto } from "./dto/update-account-information.dto";

@Public()
@Controller("accountInfos")
export class AccountInformationController {
  constructor(
    private readonly accountInformationService: AccountInformationService
  ) {}

  @Post()
  create(@Body() createAccountInformationDto: CreateAccountInformationDto) {
    return this.accountInformationService.create(createAccountInformationDto);
  }

  @Get()
  findAll() {
    return this.accountInformationService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.accountInformationService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAccountInformationDto: UpdateAccountInformationDto
  ) {
    return this.accountInformationService.update(
      +id,
      updateAccountInformationDto
    );
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.accountInformationService.remove(+id);
  }
}
