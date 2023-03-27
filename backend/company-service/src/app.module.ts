import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { CompanyModule } from "./company/company.module";
import { PositionModule } from "./position/position.module";

@Module({
  imports: [CommonModule, PositionModule, CompanyModule],
})
export class AppModule {}
