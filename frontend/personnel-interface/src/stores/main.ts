import type {
  Account,
  Company,
  DirectionTags,
  MessageRecord,
  Personnel,
  PositionTypes,
} from "@dongjiang-recruitment/service-common";
import { defineStore } from "pinia";
import io from "socket.io-client";

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

const socket = io(`http://127.0.0.1:3004`, {
  path: "/common/socket.io",
  transports: ["websocket", "polling"],
  timeout: 5000,
});

export const sendMessage = (message: MessageRecord) => {
  socket.emit("message", message);
};

export const useMessageStore = defineStore(
  "message",
  () => {
    const messages = ref<{
      [key: string]: { [key: string]: withReadStateMessageRecord[] };
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
      messages,
    };
  },
  {
    persist: {
      enabled: true,
      strategies: [
        {
          key: "pinia-message",
          storage: localStorage,
        },
      ],
    },
  }
);
