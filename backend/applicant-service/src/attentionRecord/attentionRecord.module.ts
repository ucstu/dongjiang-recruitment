import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { AttentionRecord } from "./entities/attentionRecord.entity";
import { AttentionRecordController } from "./attentionRecord.controller";
import { AttentionRecordService } from "./attentionRecord.service";

@Module({
  imports: [TypeOrmModule.forFeature([AttentionRecord])],
  controllers: [AttentionRecordController],
  providers: [AttentionRecordService],
})
export class AttentionRecordModule {}
