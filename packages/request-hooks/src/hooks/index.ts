import type {} from "@vueuse/core";
import { client } from "../client";
import { buildHooks } from "../utils";

const hooks = buildHooks(client);
const {
  request,
  accountService,
  advertiserAdvertiseService,
  advertiserService,
  applicantAttentionRecordService,
  applicantDeliveryRecordService,
  applicantEducationExperienceService,
  applicantGarnerRecordService,
  applicantInspectionRecordService,
  applicantService,
  applicantJobExpectationService,
  applicantProjectExperienceService,
  applicantWorkExperienceService,
  commonService,
  companyPositionInformationService,
  companyService,
  managerAccountService,
  managerAccountGroupService,
  managerAccountAuthoritiesService,
  personnelInspectionRecordService,
  personnelService,
} = hooks;

export {
  request,
  accountService,
  advertiserAdvertiseService,
  advertiserService,
  applicantAttentionRecordService,
  applicantDeliveryRecordService,
  applicantEducationExperienceService,
  applicantGarnerRecordService,
  applicantInspectionRecordService,
  applicantService,
  applicantJobExpectationService,
  applicantProjectExperienceService,
  applicantWorkExperienceService,
  commonService,
  companyPositionInformationService,
  companyService,
  managerAccountService,
  managerAccountGroupService,
  managerAccountAuthoritiesService,
  personnelInspectionRecordService,
  personnelService,
};
