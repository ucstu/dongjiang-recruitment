import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AccountInformationController } from "./account-information.controller";
import { AccountInformationService } from "./account-information.service";
import { AccountInformation } from "./entities/account-information.entity";

@Module({
  imports: [TypeOrmModule.forFeature([AccountInformation])],
  controllers: [AccountInformationController],
  providers: [AccountInformationService],
})
export class AccountInformationModule {}
