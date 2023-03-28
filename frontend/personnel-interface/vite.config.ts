import { resolvers, webConfig } from "@dongjiang-recruitment/vite-config";
import path from "node:path";
import { mergeConfig } from "vite";

const { NaiveUiResolver } = resolvers;

export default mergeConfig(
  webConfig({
    autoImport: {
      imports: [
        "vue",
        "pinia",
        "vue-router",
        "@vueuse/core",
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
    components: {
      resolvers: [NaiveUiResolver()],
    },
    tailwindcss: path.resolve(__dirname, "./tailwind.config.js"),
  }),
  {
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src"),
      },
    },
  }
);
