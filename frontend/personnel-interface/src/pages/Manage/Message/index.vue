<template>
  <div class="content">
    <div class="chat">
      <div class="left">
        <div class="left-top">
          <SelfInformationCard />
          <div class="title">
            <span>我的消息</span>
          </div>
        </div>
        <div style="height: calc(100% - 130px)">
          <ChatUserList
            :user-informations="userInformations"
            :messages="messages[mainStore.accountInformation.detailId.personnel!]"
            :active-user-information-id="activeUserInformationId"
            @chat-with-user="chatWithUser"
          />
        </div>
      </div>
      <div class="right">
        <ChatBox
          v-if="activeUserInformationId !== null"
          :chat-id="activeUserInformationId"
          :user-info="userInformations.get(activeUserInformationId)"
          :chat-list="
            messages[mainStore.accountInformation.detailId.personnel!][
              activeUserInformationId
            ]
          "
        />
        <el-empty
          v-else
          image="https://img.51miz.com/Element/00/90/08/25/e1fc0d58_E900825_4a0d0e68.png"
        />
        <ChatBoxBottom :chat-id="activeUserInformationId" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMainStore, useMessageStore } from "@/stores/main";
import type {
Applicant,
DeliveryRecord,
Position
} from "@dongjiang-recruitment/service-common";
import { storeToRefs } from "pinia";
import { useRoute } from "vue-router";
import ChatBox from "./components/ChatBox.vue";
import ChatBoxBottom from "./components/ChatBoxBottom.vue";
import ChatUserList from "./components/ChatUserList.vue";
import SelfInformationCard from "./components/SelfInformationCard.vue";

const route = useRoute();
const mainStore = useMainStore();
const messageStore = useMessageStore();

const activeUserInformationId = ref<string>(null as unknown as string);

// 当用户点击聊天列表中的用户时调用的函数。
const chatWithUser = (_activeUserInformationId: string | number) => {
  if (typeof _activeUserInformationId === "string") {
    activeUserInformationId.value = _activeUserInformationId.toString();
    readAllMessage(_activeUserInformationId);
  }
};
// 当用户单击聊天页面左侧的用户时将调用的函数。它会将来自用户的所有消息设置为已读
const readAllMessage = (ActiveUserInformationId: string) => {
  for (const message of messages.value[
    mainStore.accountInformation.id
  ][ActiveUserInformationId]) {
    message.haveRead = true;
  }
};

let loadedInformationCount = 0;

const deliveryRecords = ref<Map<string, DeliveryRecord>>(new Map());
const userInformations = ref<Map<string, Applicant>>(new Map());
const positionInformations = ref<Map<string, Position>>(new Map());
const { messages } = storeToRefs(messageStore);

onBeforeMount(() => {
  activeUserInformationId.value = route.params.userId.toString();
});

watchEffect(() => {
  const messageKeys = Object.keys(
    messages.value[mainStore.accountInformation.id]
  );
  const messageKeysCount = messageKeys.length;
  if (messageKeysCount > loadedInformationCount) {
    messageKeys.forEach((messageKey) => {
      applicantService.getApplicant({ id: messageKey }).then((res) => {
        userInformations.value.set(messageKey, res);
        applicantService
          .queryAllDeliveryRecord({
            query: {
              applicantId: ["$eq", messageKey],
              companyId: [
                "$eq",
                mainStore.companyInformation.id,
              ],
              status: ["$in", 1, 2, 3, 4, 5],
            },
            size: 1,
          })
          .then((res) => {
            if (res.total > 0) {
              deliveryRecords.value.set(messageKey, res.items[0]);
              companyPositionService
                .getPosition({
                  companyId: mainStore.companyInformation.id,
                  id: res.items[0].positionId,
                })
                .then((res) => {
                  positionInformations.value.set(res.id, res);
                });
            }
          });
      });
    });
    loadedInformationCount = messageKeysCount;
  }
  if (
    messages.value[mainStore.accountInformation.id][
      activeUserInformationId.value
    ]
  ) {
    readAllMessage(activeUserInformationId.value);
  }
});
</script>

<style lang="scss" scoped>
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(245 245 250);

  .chat {
    display: flex;
    width: 95%;
    height: 95%;
    background-color: rgb(255 255 255);
    border: solid 1px #ccc;
    border-radius: 5px;

    .left {
      width: 25%;
      height: 100%;
      border-right: 1px solid #ccc;

      .left-top {
        display: flex;
        flex-direction: column;
        width: 100%;
        height: 130px;
        border-bottom: solid 1px #ccc;

        .title {
          display: flex;
          justify-content: space-between;
          width: 100%;
          height: 30px;
          margin: 5px 0;

          span {
            margin: 0 10px;
            color: rgb(0 179 139);
            cursor: pointer;
          }
        }
      }
    }

    .right {
      position: relative;
      width: 75%;
      height: 100%;
    }
  }
}
</style>
