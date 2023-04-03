import type { Account } from "@dongjiang-recruitment/service-common";
import jwtDecode from "jwt-decode";
import { defineStore } from "pinia";

const parseJwt = (
  token: string
): { id?: string; did?: Account["detailId"] } => {
  if (!token) return {};
  try {
    return jwtDecode(token) as { id: string; did: Account["detailId"] };
  } catch (e) {
    return {};
  }
};

export const useMainStore = defineStore(
  "main",
  () => {
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
          if (res && !res.detailId?.manager) {
            $message.error("当前账户不是管理员账户");
            token.value = "";
          }
        },
        onError(err) {
          if (err?.message === "Not Found") {
            checked.value = false;
            $message.error("当前账户已被删除");
            token.value = "";
          }
        },
      }
    );

    return {
      token,
      account,
      setAccount,
      refreshAccount,
      loadingAccount,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          paths: ["token"],
          storage: localStorage,
        },
        {
          paths: ["account"],
          storage: sessionStorage,
        },
      ],
    },
  }
);
