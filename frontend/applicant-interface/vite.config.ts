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
          "@dongjiang-recruitment/service-common": [
            "authenticationService",
            "authenticationAccountService",
            "authenticationAuthorityGroupService",
            "authenticationAuthorityService",
            "advertiserAdvertiseService",
            "advertiserService",
            "applicantAttentionRecordService",
            "applicantDeliveryRecordService",
            "applicantEducationExperienceService",
            "applicantGarnerRecordService",
            "applicantInspectionRecordService",
            "applicantService",
            "applicantJobExpectationService",
            "applicantProjectExperienceService",
            "applicantWorkExperienceService",
            "commonService",
            "companyService",
            "companyPositionService",
            "personnelInspectionRecordService",
            "personnelService",
          ],
        },
      ],
    },
  }),
  {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: (content: any, path: string) => {
            if (path.endsWith("src/style.scss")) {
              return content;
            }

            return `
              @import "~@/style.scss";
              ${content}
            `;
          },
        },
      },
    },
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
);
