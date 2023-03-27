import { TypeOrmModule } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Module } from "@nestjs/common";
import { Applicant } from "./entities/applicant.entity";
import { ApplicantController } from "./applicant.controller";
import { ApplicantService } from "./applicant.service";

@Module({
  imports: [TypeOrmModule.forFeature([Applicant])],
  controllers: [ApplicantController],
  providers: [ApplicantService],
})
export class ApplicantModule {}
