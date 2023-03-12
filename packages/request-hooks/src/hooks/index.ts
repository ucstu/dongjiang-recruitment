import type {} from "@vueuse/core";
import { client } from "../client";
import { buildHooks } from "../utils";

const hooks = buildHooks(client);
const {
  request,
  authenticationService,
  authenticationAccountService,
  authenticationAuthorityGroupService,
  authenticationAuthorityService,
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
  companyService,
  companyPositionService,
  personnelInspectionRecordService,
  personnelService,
} = hooks;

export {
  request,
  authenticationService,
  authenticationAccountService,
  authenticationAuthorityGroupService,
  authenticationAuthorityService,
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
  companyService,
  companyPositionService,
  personnelInspectionRecordService,
  personnelService,
};
