import type {
  Account,
  Company,
  DirectionTags,
  MessageRecord,
  Personnel,
  PositionTypes,
} from "@dongjiang-recruitment/service-common";
import { defineStore } from "pinia";

export interface withReadStateMessageRecord extends MessageRecord {
  haveRead: boolean;
}
export const useMainStore = defineStore("main", {
  state: () => ({
    jsonWebToken: null as unknown as string,
    hrInformation: null as unknown as Personnel,
    accountInformation: null as unknown as Account,
    companyInformation: null as unknown as Company,
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
