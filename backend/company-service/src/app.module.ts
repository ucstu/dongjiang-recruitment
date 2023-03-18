import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";

@Module({
  imports: [CommonModule, CompanyModule],
})
export class AppModule {}
