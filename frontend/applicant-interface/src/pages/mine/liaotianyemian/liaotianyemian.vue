<template>
  <view class="page">
    <!--  #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
    <view
      class="flex-row items-center group-top"
      :style="
        'width: ' +
        navigationBarWidth +
        'px; margin-top: ' +
        navigationBarTop +
        'px'
      "
    >
      <image
        class="image-left"
        src="@/static/icons/arrow-left-blob.png"
        @click="goBack"
      />
      <view class="flex-col top-title">
        <text class="justify-center text-top">{{ hrInfo.hrName }}</text>
        <text class="text-bottom">{{ hrInfo.postName }}</text>
      </view>
    </view>
    <!-- #endif -->
    <!--  #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
    <view style="height: 20rpx"></view>
    <view class="flex-row items-center group-top">
      <image
        class="image-left"
        src="@/static/icons/arrow-left-blob.png"
        @click="goBack"
      />
      <view class="flex-col top-title">
        <text class="justify-center text-top">{{ hrInfo.hrName }}</text>
        <text class="justify-center text-bottom">{{ hrInfo.postName }}</text>
      </view>
    </view>
    <!-- #endif -->
    <scroll-view class="group-info" :scroll-y="true" :scroll-top="scrollTop">
      <view
        v-for="recode in store.messages[
          store.account.fullInformationId
        ][messageKey]"
        :key="recode.messageRecordId"
      >
        <Left
          v-if="recode.initiateType === 2"
          :mes="recode.content"
          :type="recode.messageType"
          :hr-info="hrInfo"
        ></Left>
        <Right
          v-if="recode.initiateType === 1"
          :mes="recode.content"
          :type="recode.messageType"
        ></Right
      ></view>
    </scroll-view>
    <view class="flex-col group-end justify-center">
      <view class="flex-row justify-between items-end input-box">
        <view class="items-center text-input">
          <textarea
            v-model="inputValue"
            class="items-center input"
            :maxlength="100"
            :auto-height="true"
          />
        </view>
        <text class="items-center text-send" @click="sendMes"> 发送</text>
      </view>
      <view class="justify-between function-box">
        <image class="image" src="@/static/icons/audio-fill.svg" />
        <image
          class="image"
          src="@/static/icons/picture-fill.svg"
          @click="sendImage"
        />
        <image class="image" src="@/static/icons/camera.svg" />
        <image class="image" src="@/static/icons/emoji.svg" />
        <image class="image" src="@/static/icons/plus-circle.svg" />
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import Left from "@/components/BubbleBox/BubbleBoxHr.vue";
import Right from "@/components/BubbleBox/BubbleBoxUser.vue";
import { getHrInfosP0 } from "@/services/services";
import { HrInformation } from "@/services/types";
import { useAuthStore } from "@/stores/auth";
import { failResponseHandler } from "@/utils/handler";
import { sendMessage } from "@/utils/stomp";

const VITE_BASE_URL = import.meta.env.VITE_BASE_URL;
const store = useAuthStore();

/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ */

const navigationBarTop = store.menu.top;

const navigationBarWidth = store.menu.left - uni.upx2px(30);

/* #endif */

const hrInfo = ref<HrInformation>({} as HrInformation);
const inputValue = ref("");
const messageKey = ref("");
const scrollTop = ref(0);

watchEffect(() => {
  // 用于在页面高度发生变化时滚动到页面底部。
  if (
    store.messages[store.account.detailId.personnel][
      hrInfo.value.hrInformationId
    ]
  ) {
    const sTop =
      store.messages[store.account.detailId.personnel][
        hrInfo.value.hrInformationId
      ].length * uni.upx2px(150);
    nextTick(() => {
      scrollTop.value = sTop;
    });
  }

  // 这是为了检查用户是否已经与 HR 进行过对话。如果没有，它将创建一个新的对话。
  if (!store.messages[store.account.detailId.personnel]) {
    store.messages[store.account.detailId.personnel] = {};
  }
  for (const key in store.messages[
    store.account.fullInformationId
  ]) {
    if (key === hrInfo.value.hrInformationId) {
      messageKey.value = key;
    }
  }
});

onLoad((e) => {
  if (e.Id) {
    getHrInfosP0(e.Id)
      .then((res) => {
        hrInfo.value = res.data.body;
      })
      .catch(failResponseHandler);
  }
  if (e.key) {
    messageKey.value = e.key;
  }
});

const goBack = () => {
  uni.navigateBack({
    delta: 1,
  });
};

// 发送消息的函数。
const sendMes = () => {
  if (inputValue.value.length) {
    sendMessage(inputValue.value, 1, hrInfo.value.hrInformationId, 2);
    inputValue.value = "";
  } else {
    uni.showToast({
      title: "消息内容不能为空",
      icon: "none",
      duration: 1500,
    });
  }
};

// 发送图片
const sendImage = () => {
  uni.chooseImage({
    success: (res) => {
      const tempFilePath = res.tempFilePaths;
      uni.uploadFile({
        url: VITE_BASE_URL + "/files",
        filePath: tempFilePath[0],
        name: "file",
        header: {
          Authorization: "Bearer " + store.token,
        },
        success: (res) => {
          const response = JSON.parse(res.data) as {
            body: string;
            message: string;
            status: number;
            timestamp: string;
          };
          sendMessage(response.body, 2, hrInfo.value.hrInformationId, 2);
        },
        fail: (err) => {
          uni.showToast({
            title: "发送失败",
            icon: "none",
            duration: 1500,
          });
        },
      });
    },
  });
};
</script>

<style lang="scss" scoped>
.page {
  // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
  height: 1334rpx;

  // #endif
  // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
  height: 1620rpx;

  // #endif
  overflow: hidden;
  background-color: rgb(235 235 235);

  .group-top {
    height: var(--tab-bar-height);

    .image-left {
      width: 25rpx;
      height: 35rpx;
      margin-left: 20rpx;
    }

    .top-title {
      width: 100%;
      height: var(--tab-bar-height);

      .text-top {
        height: 50%;
        font-size: 30rpx;
      }

      .text-bottom {
        height: 50%;
        font-size: 25rpx;
      }
    }
  }

  .group-info {
    width: 100%;

    // #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    height: 1040rpx;

    // #endif
    // #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ
    max-height: 1300rpx;

    // #endif
  }

  .group-end {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: auto;

    .input-box {
      width: 94%;
      min-height: 70rpx;
      max-height: 350rpx;
      margin-left: 3%;

      .text-input {
        width: 600rpx;
        min-height: 70rpx;
        max-height: 350rpx;
        padding-left: 10rpx;
        background-color: #fff;
        border-radius: 30rpx;
      }

      .text-send {
        height: 60rpx;
        padding: 3rpx 25rpx;
        font-size: 30rpx;
        color: #fff;
        background-color: rgb(9 164 225);
        border-radius: 30rpx;
      }
    }

    .function-box {
      width: 94%;
      height: 60rpx;
      margin-top: 10rpx;
      margin-left: 3%;

      .image {
        width: 60rpx;
        height: 60rpx;
      }
    }
  }
}
</style>
