<template>
  <NavigationBar title="我的账户" />
  <view class="flex-col page">
    <view class="justify-between items-center section">
      <text class="phone">账号</text>
      <text class="phone-num">{{ phoneNumber }}</text>
    </view>
    <view class="flex-col items-center button-box">
      <button class="button" @click="showDelete">注销账号</button>
    </view>
    <wybModal
      ref="modal"
      title="注销账号"
      content="您确认注销账号吗？"
      @confirm="deleteAccount"
    />
    <wybPopup
      ref="popup"
      :mask-click-close="false"
      :show-close-icon="false"
      :width="700"
      :height="400"
      :radius="10"
      mode="size-auto"
      type="center"
    >
      <view class="flex-col justify-center code-box">
        <text style="font-size: 40rpx; font-weight: bold; text-align: center"
          >请输入验证码</text
        >
        <view class="flex-col justify-between" style="margin-top: 20rpx">
          <input
            v-model="code"
            class="text-input"
            :adjust-position="false"
            :auto-blur="true"
            :focus="focus"
            type="number"
            :maxlength="4"
            @blur="focus = false"
          />
          <view class="flex-row justify-between code-input" @click="codeNum">
            <view
              v-for="(item, i) in 4"
              :key="i"
              class="justify-center items-center input"
              >{{ code[i] }}</view
            >
          </view>
          <text style="margin-top: 10rpx" @click="sendVerification"
            >重新发送</text
          >
        </view>
        <view
          class="justify-between items-center"
          style="width: 100%; height: auto; margin-top: 20rpx"
        >
          <button class="cancel-button" @click="cancelDelete">取消</button>
          <button class="confirm-button" @click="confirmDelete">确认</button>
        </view>
      </view>
    </wybPopup>
  </view>
</template>
<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybModal from "@/components/wyb-modal/wyb-modal.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import { useInfoStore } from "@/stores";
import { useAuthStore } from "@/stores/auth";

const authStore = useAuthStore();
const infoStore = useInfoStore();

const { runAsync: sendVerificationCode } =
  commonService.useSendVerificationCode(undefined, {
    manual: true,
  });
// 隐藏账号
const phoneNumber = authStore.account!.userName.replace(
  /(\d{3})\d{4}(\d{4})/,
  "$1****$2"
);
const code = ref<string>("");
const focus = ref<boolean>(false);

const codeNum = () => {
  focus.value = true;
};

// 注销账号消息提示
const modal = ref<InstanceType<typeof wybModal>>();
const popup = ref<InstanceType<typeof wybPopup>>();
const showDelete = () => {
  modal.value?.showModal();
};
const { refreshAsync: destroyAccount } =
  authenticationService.useDestroyAccount(
    {
      id: authStore.account!.id,
      verificationCode: code.value,
    },
    {
      manual: true,
    }
  );
// 注销账号
const deleteAccount = async () => {
  await sendVerificationCode({ email: phoneNumber });
  uni.showToast({
    title: "验证码已发送",
    icon: "none",
    duration: 1500,
  });
  popup.value?.show();
};
// 重新获取验证码
const sendVerification = async () => {
  await sendVerificationCode({ email: phoneNumber });
  uni.showToast({
    title: "验证码已发送",
    icon: "none",
    duration: 1500,
  });
};

const cancelDelete = () => {
  popup.value?.hide();
};

// 注销账号并退出登录
const confirmDelete = async () => {
  await destroyAccount();
  authStore.token = null;
  authStore.account = null;
  infoStore.applicant = null;
  infoStore.jobExpectations = [];
  uni.navigateTo({
    url: "/account/denglu_zhuce/denglu",
  });
  popup.value?.hide();
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  margin-left: 20rpx;

  .section {
    width: 100%;
    height: 100rpx;
    border: 1rpx solid rgb(230 230 230);
    border-radius: 10rpx;

    .phone {
      padding-left: 20rpx;
      font-size: 30rpx;
    }

    .phone-num {
      padding-right: 20rpx;
      font-size: 28rpx;
      color: gray;
    }
  }

  .button-box {
    position: absolute;
    bottom: 40rpx;
    width: 710rpx;
    height: 80rpx;

    .button {
      width: 600rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .code-box {
    width: 90%;
    height: auto;
    margin-top: 20rpx;
    margin-left: 5%;
    font-size: 30rpx;

    .text-input {
      position: absolute;
      left: -100rpx;
      width: 50rpx;
      height: 50rpx;
    }

    .code-input {
      width: 100%;
      height: auto;
      font-size: 40rpx;

      .input {
        width: 20%;
        height: 110rpx;
        border: 5rpx solid rgb(230 230 230);
        border-radius: 10rpx;
      }
    }

    .cancel-button {
      width: 30%;
      height: 80rpx;
      font-size: 30rpx;
      color: rgb(0 0 0);
      background-color: rgb(240 240 240);
      border-radius: 10rpx;
    }

    .confirm-button {
      width: 65%;
      height: 80rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }
}
</style>
