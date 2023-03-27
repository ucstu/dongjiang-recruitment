<template>
  <NavigationBar title="设置" />
  <view class="flex-col page">
    <view class="justify-between items-center group-box" @click="toMyAccount">
      <text class="text-title">我的账户</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <view class="justify-between items-center group-box" @click="toPassWord">
      <text class="text-title">设置密码</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <!-- <view class="justify-between items-center group-box" @click="toNotice">
      <text class="text-title">通知设置</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view> -->
    <view
      class="justify-between items-center group-box"
      @click="toUserAgreement"
    >
      <text class="text-title">用户协议</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <view
      class="justify-between items-center group-box"
      @click="toPrivacyPolicy"
    >
      <text class="text-title">隐私政策</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <!-- <view class="justify-between items-center group-box">
      <text class="text-title">清除缓存</text>
    </view> -->
    <view class="justify-between items-center group-box" @click="toVersion">
      <text class="text-title">版本更新</text>
      <image class="image" src="@/static/icons/arrow-right.png" />
    </view>
    <view class="justify-center group-button">
      <view class="justify-center items-center button-box" @click="exitAccount">
        <text>退出当前账号</text>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { AccountInformation, UserInformation } from "@/services/types";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

// 我的账户
const toMyAccount = () => {
  uni.navigateTo({ url: "/setting/wodezhanghu/wodezhanghu" });
};
// 设置密码
const toPassWord = () => {
  uni.navigateTo({ url: "/setting/shezhimima/shezhimima" });
};
const toNotice = () => {
  uni.navigateTo({ url: "/setting/tongzhishezhi/tongzhishezhi" });
};
// 用户协议
const toUserAgreement = () => {
  uni.navigateTo({ url: "/setting/yonghuxieyi/yonghuxieyi" });
};
// 隐私设置
const toPrivacyPolicy = () => {
  uni.navigateTo({ url: "/setting/yinsicelve/yinsicelve" });
};
// 版本更新
const toVersion = () => {
  uni.navigateTo({ url: "/setting/banbengengxin/banbengengxin" });
};
// 退出当前账号
const exitAccount = () => {
  // 清除存储中的数据。
  store.jobExpectations = [];
  store.token = null as unknown as string;
  store.applicant = null as unknown as UserInformation;
  store.account = null as unknown as AccountInformation;
  uni.navigateTo({ url: "/account/denglu_zhuce/denglu" });
};
</script>

<style lang="scss" scoped>
.page {
  .group-box {
    width: 710rpx;
    height: 100rpx;
    margin-top: 20rpx;
    margin-left: 20rpx;
    border: 2rpx solid rgb(200 200 200);
    border-radius: 10rpx;

    .text-title {
      padding-left: 20rpx;
      font-size: 30rpx;
    }
  }

  .group-button {
    position: fixed;
    bottom: 40rpx;
    width: 100%;
    height: 80rpx;

    .button-box {
      width: 500rpx;
      font-size: 30rpx;
      color: #fff;
      background-color: rgb(35 193 158);
      border-radius: 10rpx;
    }
  }

  .image {
    width: 50rpx;
    height: 32rpx;
    padding-right: 10rpx;
  }
}
</style>
