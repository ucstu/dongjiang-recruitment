import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { DeliveryRecord } from "./entities/deliveryRecord.entity";
import { DeliveryRecordController } from "./deliveryRecord.controller";
import { DeliveryRecordService } from "./deliveryRecord.service";

@Module({
  imports: [TypeOrmModule.forFeature([DeliveryRecord])],
  controllers: [DeliveryRecordController],
  providers: [DeliveryRecordService],
})
export class DeliveryRecordModule {}
