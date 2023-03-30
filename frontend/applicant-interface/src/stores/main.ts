import type { Message } from "@/interfaces";
import {
  request,
  type Account,
  type Applicant,
  type JobExpectation,
} from "@dongjiang-recruitment/service-common";
import { defineStore } from "pinia";

export const useMainStore = defineStore(
  "main",
  () => {
    // 系统信息
    const system = ref<UniApp.GetSystemInfoResult>(uni.getSystemInfoSync());
    const menu = ref<UniApp.GetMenuButtonBoundingClientRectRes>(
      uni.getMenuButtonBoundingClientRect?.()
    );
    // 授权信息
    const token = ref<string>("");
    const account = ref<Account>({} as Account);
    const login = async (userName: string, password: string) => {
      const { account: _account, token: _token } =
        await authenticationService.loginAccount({
          requestBody: { userName, password },
        });
      token.value = _token;
      account.value = _account;
      request.config.TOKEN = _token;
      if (!_account.detailId.applicant) {
        uni.showToast({
          title: "请先完善个人信息",
        });
        uni.reLaunch({
          url: "/pages/init/wanshangerenxinxi/wanshangerenxinxi",
        });
        return;
      }
    };
    const logout = async () => {
      token.value = "";
      account.value = {} as Account;
    };
    // 用户信息
    const applicantId = computed(
      () => account.value?.detailId?.applicant || ""
    );
    const applicant = ref<Applicant>({} as Applicant);
    const jobExpectations = ref<JobExpectation[]>([]);
    const loadInfo = async () => {
      const _applicant = await applicantService.getApplicant({
        id: applicantId.value,
      });
      if (!_applicant.email) {
        uni.showToast({
          title: "请先完善个人信息",
        });
        uni.reLaunch({
          url: "/pages/init/wanshangerenxinxi/wanshangerenxinxi",
        });
        return;
      }
      applicant.value = _applicant;
      const _jobExpectations = (
        await applicantJobExpectationService.queryJobExpectation({
          applicantId: applicantId.value,
        })
      ).items;
      if (!_jobExpectations.length) {
        uni.showToast({
          title: "请先完善求职意向",
        });
        uni.reLaunch({
          url: "/pages/init/wanshengqiuzhiyixiang/wanshengqiuzhiyixiang",
        });
        return;
      }
      jobExpectations.value = _jobExpectations;
    };

    // 其他信息
    const { data: cities } = commonService.useGetCities(undefined, {
      initialData: [],
    });
    const messages = ref<{
      [key: string]: { [key: string]: Message[] };
    }>({});

    return {
      system,
      menu,
      token,
      account,
      login,
      logout,
      applicant,
      jobExpectations,
      loadInfo,
      cities,
      messages,
    };
  },
  {
    persist: {
      enabled: true,
    },
  }
);
