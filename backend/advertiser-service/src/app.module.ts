import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { AdvertiserModule } from "./advertiser/advertiser.module";

@Module({
  imports: [CommonModule, AdvertiserModule],
})
export class AppModule {}
