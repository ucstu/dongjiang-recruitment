import type {} from "@vueuse/core";
import { client } from "../client";
import { buildHooks } from "../utils";

const hooks = buildHooks(client);
const {
  request,
  applicantAttentionRecordService,
  applicantDeliveryRecordService,
  applicantEducationExperienceService,
  applicantGarnerRecordService,
  applicantInspectionRecordService,
  applicantService,
  authenticationService,
  applicantJobExpectationService,
  applicantProjectExperienceService,
  applicantWorkExperienceService,
  commonService,
  companyPositionInformationService,
  companyService,
  managerAccountService,
  managerAccountGroupService,
  managerAccountauthoritiesService,
  personnelInspectionRecordService,
  personnelService,
} = hooks;

export {
  request,
  applicantAttentionRecordService,
  applicantDeliveryRecordService,
  applicantEducationExperienceService,
  applicantGarnerRecordService,
  applicantInspectionRecordService,
  applicantService,
  authenticationService,
  applicantJobExpectationService,
  applicantProjectExperienceService,
  applicantWorkExperienceService,
  commonService,
  companyPositionInformationService,
  companyService,
  managerAccountService,
  managerAccountGroupService,
  managerAccountauthoritiesService,
  personnelInspectionRecordService,
  personnelService,
};
