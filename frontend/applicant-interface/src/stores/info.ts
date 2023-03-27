import type { Message } from "@/interfaces";
import {
request,
type Applicant,
type Cities,
type JobExpectation
} from "@dongjiang-recruitment/service-common";
import { defineStore } from "pinia";
import { useAuthStore } from "./auth";

export const useInfoStore = defineStore("info", () => {
  // 授权信息
  const { token, account } = storeToRefs(useAuthStore());
  // 系统信息
  const system = ref<UniApp.GetSystemInfoResult>(uni.getSystemInfoSync());
  const menu = ref<UniApp.GetMenuButtonBoundingClientRectRes>(
    uni.getMenuButtonBoundingClientRect?.()
  );
  // 用户信息
  const applicant = ref<Applicant | null>(null);
  const jobExpectations = ref<JobExpectation[]>([]);
  // 其他信息
  const cities = ref<Cities>([]);
  const messages = ref<{
    [key: string]: { [key: string]: Message[] };
  }>({});
  watch(
    () => token.value,
    (value) => {
      request.config.TOKEN = value as string;
    }
  );
  watchEffect(async () => {
    if (account.value?.detailId.applicant) {
      applicant.value = await applicantService.getApplicant({
        id: account.value.detailId.applicant,
      });
      jobExpectations.value = (
        await applicantJobExpectationService.queryJobExpectation({
          applicantId: account.value.detailId.applicant,
        })
      ).items;
      cities.value = await commonService.getCities();
    } else {
      applicant.value = null;
      jobExpectations.value = [];
    }
  });
  return {
    applicant,
    jobExpectations,
    system,
    menu,
    cities,
    messages,
  };
});
