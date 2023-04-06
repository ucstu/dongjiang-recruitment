import type { Message } from "@/interfaces";
import type {
  Account,
  MessageRecord,
} from "@dongjiang-recruitment/service-common";
// @ts-ignore
import io from "@hyoga/uni-socket.io";
import dayjs from "dayjs";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";

const parseJwt = (
  token: string
): { id?: string; did?: Account["detailId"] } => {
  if (!token) return {};
  try {
    return jwtDecode(token);
  } catch (e) {
    return {};
  }
};

// const socket = io(`${import.meta.env.VITE_BASE_URL}`, {
const socket = io(`http://127.0.0.1:3004`, {
  path: "/common/socket.io",
  transports: ["websocket", "polling"],
  timeout: 5000,
});

export const sendMessage = (message: MessageRecord) => {
  socket.emit("message", message);
};

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
    const checked = ref<boolean>(false);
    const accountId = computed(() => parseJwt(token.value).id);
    const {
      data: account,
      loading: loadingAccount,
      mutate: setAccount,
      refresh: refreshAccount,
    } = authenticationAccountService.useGetAccount(
      () => ({ id: accountId.value! }),
      {
        ready: computed(() => !!accountId.value),
        refreshDeps: [accountId],
        onSuccess(res) {
          checked.value = true;
          if (res && !res.detailId?.applicant) {
            uni.showToast({
              title: "当前账户不是求职者账户，请注册求职者账户",
            });
            uni.reLaunch({
              url: "/pages/account/denglu_zhuce/zhucezhanghao",
            });
          }
        },
        onError(err) {
          if (err?.message === "Not Found") {
            checked.value = false;
            uni.showToast({
              title: "当前账户已被删除，请重新注册",
            });
            uni.reLaunch({
              url: "/pages/account/denglu_zhuce/zhucezhanghao",
            });
            token.value = "";
          }
        },
      }
    );
    // 用户信息
    const applicantId = computed(() => parseJwt(token.value).did?.applicant);
    const {
      data: applicant,
      loading: loadingApplicant,
      mutate: setApplicant,
      refresh: refreshApplicant,
    } = applicantService.useGetApplicant(() => ({ id: applicantId.value! }), {
      ready: computed(() => !!applicantId.value && checked.value),
      refreshDeps: [applicantId],
      onSuccess(res) {
        if (res && !res.email) {
          uni.showToast({
            title: "请先完善个人信息",
          });
          uni.reLaunch({
            url: "/pages/info/gerenxinxi/gerenxinxi",
          });
        } else {
          messages.value[applicantId.value!] = {};
          applicantEducationExperienceService
            .queryEducationExperience({
              applicantId: applicantId.value!,
            })
            .then((res1) => {
              setApplicant({
                ...res,
                age: dayjs().diff(res.dateOfBirth, "year"),
                education: res1.items.length
                  ? res1.items.reduce(
                      (prev, curr) =>
                        curr.education > prev ? curr.education : prev,
                      res1.items[0].education as any
                    )
                  : null,
              });
            });
        }
      },
    });
    const {
      data: jobExpectations,
      loading: loadingJobExpectations,
      mutate: setJobExpectations,
      refresh: refreshJobExpectations,
    } = applicantJobExpectationService.useQueryJobExpectation(
      () => ({
        applicantId: applicantId.value!,
      }),
      {
        ready: computed(() => !!applicantId.value && checked.value),
        refreshDeps: [applicantId],
        onSuccess(res) {
          if (res && !res.items.length) {
            uni.showToast({
              title: "请先完善求职意向",
            });
            uni.reLaunch({
              url: "/pages/info/qiuzhiyixiang/qiuzhiyixiang",
            });
          }
        },
      }
    );
    // 其他信息
    const {
      data: cities,
      loading: loadingCities,
      mutate: setCities,
      refresh: refreshCities,
    } = commonService.useGetCities(undefined, {
      initialData: [],
    });
    const messages = ref<{
      [key: string]: { [key: string]: Message[] };
    }>({});
    socket.on("connect", () => {
      socket.on(socket.id, (message: MessageRecord) => {
        const { initiateId, serviceId } = message;
        if (!messages.value[initiateId]) messages.value[initiateId] = {};
        if (!messages.value[initiateId][serviceId])
          messages.value[initiateId][serviceId] = [];
        messages.value[initiateId][serviceId].push({
          ...message,
          haveRead: false,
        });
      });
    });

    return {
      system,
      menu,
      token,
      account,
      setAccount,
      refreshAccount,
      loadingAccount,
      applicant,
      setApplicant,
      refreshApplicant,
      loadingApplicant,
      jobExpectations,
      setJobExpectations,
      refreshJobExpectations,
      loadingJobExpectations,
      cities,
      setCities,
      refreshCities,
      loadingCities,
      messages,
    };
  },
  {
    persist: {
      enabled: true,
      H5Storage: window.localStorage,
      detached: true,
      strategies: [
        {
          paths: ["token"],
        },
      ],
    },
  }
);
