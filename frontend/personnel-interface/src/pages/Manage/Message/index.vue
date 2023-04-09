<template>
  <div class="content">
    <div class="chat">
      <div class="left">
        <div class="left-top">
          <SelfInformationCard />
          <div class="title">
            <span>我的消息</span>
            <span @click="messages = {}">清空</span>
          </div>
        </div>
        <div style="height: calc(100% - 130px)">
          <ChatUserList
            :messages="messages"
            :user-informations="userInformation"
            :active-user-information-id="activeUserInformation?.id"
            @chat-with-user="chatWithUser"
          />
        </div>
      </div>
      <div class="right">
        <ChatBox
          v-if="activeUserInformation"
          :chat-id="activeUserInformation.id"
          :user-info="activeUserInformation"
          :chat-list="messages[activeUserInformation.id]"
        />
        <el-empty
          v-else
          image="https://img.51miz.com/Element/00/90/08/25/e1fc0d58_E900825_4a0d0e68.png"
        />
        <ChatBoxBottom :chat-id="activeUserInformation?.id" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from "@/stores/main";
import type { Applicant } from "@dongjiang-recruitment/service-common";
import ChatBox from "./components/ChatBox.vue";
import ChatBoxBottom from "./components/ChatBoxBottom.vue";
import ChatUserList from "./components/ChatUserList.vue";
import SelfInformationCard from "./components/SelfInformationCard.vue";

const { messages } = storeToRefs(useMessageStore());
const userInformation = new Map<string, Applicant>();
const activeUserInformation = ref<Applicant>();

// 当用户点击聊天列表中的用户时调用的函数。
const chatWithUser = async (_activeUserInformationId: string | number) => {
  if (userInformation.has(_activeUserInformationId.toString())) {
    activeUserInformation.value = userInformation.get(
      _activeUserInformationId.toString()
    )!;
  } else {
    const res = await applicantService.getApplicant({
      id: _activeUserInformationId.toString(),
    });
    userInformation.set(_activeUserInformationId.toString(), res);
    activeUserInformation.value = res;
  }
};
// 当用户单击聊天页面左侧的用户时将调用的函数。它会将来自用户的所有消息设置为已读
const readAllMessage = (userInformationId: string) => {
  for (const message of messages.value[userInformationId]) {
    message.haveRead = true;
  }
};
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
