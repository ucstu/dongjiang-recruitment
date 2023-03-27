<template>
  <view class="flex-row items-center info-box" @click="toChatPage">
    <image
      class="image-heard"
      :src="
        VITE_CDN_URL +
        (hrInfo.avatarUrl ? hrInfo.avatarUrl : '/image/heard2.jpg')
      "
    />
    <view class="infos">
      <view class="flex-row justify-between name-time">
        <text>{{ hrInfo!.hrName }}</text>
        <text style="font-size: 25rpx">{{ time }}</text>
      </view>
      <view class="justify-between items-center flex-row">
        <view class="message">
          <text v-if="initiateType === 1" style="white-space: nowrap">{{
            mes
          }}</text>
          <text v-else-if="initiateType === 2" style="white-space: nowrap"
            >图片</text
          >
        </view>
        <view v-if="!isRead" class="is-read"></view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useAuthStore } from "@/stores/auth";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;

const store = useAuthStore();

const props = defineProps({
  hrInfo: {
    type: Object,
    default: () => ({}),
  },
  mes: {
    type: String,
    default: "",
  },
  isRead: {
    type: Boolean,
    default: true,
  },
  time: {
    type: String,
    default: "",
  },
  messageKey: {
    type: String,
    default: "",
  },
  initiateType: {
    type: Number,
    default: 0,
  },
});

onShow(() => {
  return props.isRead;
});

// 当用户单击消息时调用的函数。它会将消息更改为已阅读，然后导航到聊天页面。
const toChatPage = () => {
  store.messages[store.account.fullInformationId][
    props.hrInfo.hrInformationId
  ][
    store.messages[store.account.fullInformationId][
      props.hrInfo.hrInformationId
    ].length - 1
  ].haveRead = true;
  const i = props.hrInfo.hrInformationId;
  uni.navigateTo({
    url:
      "/mine/liaotianyemian/liaotianyemian?Id=" +
      i +
      "&key=" +
      props.messageKey,
  });
};
</script>

<style lang="scss" scoped>
.info-box {
  width: 94%;
  height: 130rpx;
  margin-left: 3%;

  .image-heard {
    width: 110rpx;
    height: 110rpx;
    border-radius: 50%;
  }

  .infos {
    width: 83%;
    height: auto;
    margin-left: 2%;
    line-height: 50rpx;

    .name-time {
      width: 100%;
      height: auto;
      font-size: 30rpx;
    }

    .message {
      width: 90%;
      overflow: hidden;
      font-size: 25rpx;
      text-overflow: ellipsis;
    }

    .is-read {
      width: 25rpx;
      height: 25rpx;
      font-size: 25rpx;
      color: white;
      background-color: rgb(247 25 13 / 99.5%);
      border-radius: 50%;
    }
  }
}
</style>
