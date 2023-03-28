import {
  AccountInformation,
  CompanyInformation,
  DirectionTags,
  HrInformation,
  MessageRecord,
  PositionTypes
} from "@/services/types";
import { defineStore } from "pinia";

export interface withReadStateMessageRecord extends MessageRecord {
  haveRead: boolean;
}
export const useMainStore = defineStore("main", {
  state: () => ({
    jsonWebToken: null as unknown as string,
    hrInformation: null as unknown as HrInformation,
    accountInformation: null as unknown as AccountInformation,
    companyInformation: null as unknown as CompanyInformation,
    positionTypes: null as unknown as PositionTypes,
    directionTags: null as unknown as DirectionTags,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pinia-main",
      },
    ],
  },
});

export const useCompriseStore = defineStore("comprise", {
  state: () => ({
    comprise: [] as Array<string>,
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pinia-comprise",
        storage: localStorage,
      },
    ],
  },
});

export const useMessageStore = defineStore("message", {
  state: () => ({
    messages: {} as {
      [key: string]: { [key: string]: withReadStateMessageRecord[] };
    },
  }),
  persist: {
    enabled: true,
    strategies: [
      {
        key: "pinia-message",
        storage: localStorage,
      },
    ],
  },
});
