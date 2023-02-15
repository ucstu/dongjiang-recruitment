import { uniConfig } from "@dongjiang-recruitment/vite-config";
import path from "node:path";
import { mergeConfig } from "vite";

export default mergeConfig(
  uniConfig({
    autoImport: {
      imports: [
        "vue",
        "pinia",
        "uni-app",
        {
          "@dongjiang-recruitment/request-hooks": [
            "applicantAttentionRecordService",
            "applicantDeliveryRecordService",
            "applicantEducationExperienceService",
            "applicantGarnerRecordService",
            "applicantInspectionRecordService",
            "applicantService",
            "authenticationService",
            "applicantJobExpectationService",
            "applicantProjectExperienceService",
            "applicantWorkExperienceService",
            "commonService",
            "companyPositionInformationService",
            "companyService",
            "managerAccountService",
            "managerAccountGroupService",
            "managerAccountauthoritiesService",
            "personnelInspectionRecordService",
            "personnelService",
          ],
        },
      ],
    },
  }),
  {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
);
