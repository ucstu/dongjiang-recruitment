import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { ApplicantModule } from "./applicant/applicant.module";
import { AttentionRecordModule } from "./attentionRecord/attentionRecord.module";
import { DeliveryRecordModule } from "./deliveryRecord/deliveryRecord.module";
import { EducationExperienceModule } from "./educationExperience/educationExperience.module";
import { GarnerRecordModule } from "./garnerRecord/garnerRecord.module";
import { InspectionRecordModule } from "./inspectionRecord/inspectionRecord.module";
import { JobExpectationModule } from "./jobExpectation/jobExpectation.module";
import { ProjectExperienceModule } from "./projectExperience/projectExperience.module";
import { WorkExperienceModule } from "./workExperience/workExperience.module";

@Module({
  imports: [
    CommonModule,
    ApplicantModule,
    AttentionRecordModule,
    DeliveryRecordModule,
    EducationExperienceModule,
    GarnerRecordModule,
    InspectionRecordModule,
    JobExpectationModule,
    ProjectExperienceModule,
    WorkExperienceModule,
  ],
})
export class AppModule {}
