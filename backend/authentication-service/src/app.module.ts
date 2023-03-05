import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { AccountInformationModule } from "./account-information/account-information.module";

@Module({
  imports: [CommonModule, AccountInformationModule],
})
export class AppModule {}
