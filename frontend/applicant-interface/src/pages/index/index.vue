<template>
  <view class="content">
    <image class="logo" src="/static/logo.png" />
    <view class="text-area">
      <text class="title">{{ title }}</text>
      <input v-model="page" type="number" placeholder="页数" />
      <button @click="refresh">请求</button>
    </view>
  </view>
</template>

<script setup lang="ts">
const page = ref<number>(1);

const { refresh } = applicantService.useGetAllUserInformation(
  () => ({
    size: 10,
    page: page.value,
  }),
  {
    manual: true,
  }
);
const title = ref("Hello");
</script>

<style>
.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.logo {
  width: 200rpx;
  height: 200rpx;
  margin: 200rpx auto 50rpx;
}

.text-area {
  display: flex;
  justify-content: center;
}

.title {
  font-size: 36rpx;
  color: #8f8f94;
}
</style>
