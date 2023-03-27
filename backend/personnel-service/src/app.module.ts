import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { InspectionRecordModule } from "./inspectionRecord/inspectionRecord.module";
import { PersonnelModule } from "./personnel/personnel.module";

@Module({
  imports: [CommonModule, PersonnelModule, InspectionRecordModule],
})
export class AppModule {}
