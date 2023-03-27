import type { Account } from "@dongjiang-recruitment/service-common";
import { defineStore } from "pinia";

export const useAuthStore = defineStore(
  "auth",
  () => {
    // 授权信息
    const token = ref<string | null>(null);
    const account = ref<Account | null>(null);
    return {
      token,
      account,
    };
  },
  {
    persist: {
      enabled: true,
    },
  }
);
