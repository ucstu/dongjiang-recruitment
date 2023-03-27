<template>
  <NavigationBar title="我的查看" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobDetail
        v-for="(myView, i) in myViews"
        :key="i"
          :position="myView"
        @job-click="
          view_2OnClick(
            myView.companyInformationId,
            myView.positionInformationId
          )
        "
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import {
getCompanyInfosP0PositionInfosP1,
getUserInfosP0InspectionRecords
} from "@/services/services";
import { PositionInformation } from "@/services/types";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const myViews = ref<PositionInformation[]>([]);
/* 查询所有查看记录 */
getUserInfosP0InspectionRecords(
  store.account.fullInformationId,
  {}
).then((res) => {
  for (const item of res.data.body.userInspectionRecords) {
    getCompanyInfosP0PositionInfosP1(
      item.companyInformationId,
      item.positionInformationId
    ).then((res) => {
      const p = myViews.value.map((item) => item.positionInformationId);
      if (!p.includes(res.data.body.positionInformationId)) {
        myViews.value.push(res.data.body);
      }
    });
  }
});

const view_2OnClick = (c: string, p: string) => {
  uni.navigateTo({
    url:
      "/detail/zhiweixiangqing/zhiweixiangqing?companyId=" +
      c +
      "&positionId=" +
      p,
  });
};
</script>
<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: auto;

  .list {
    margin-top: 20rpx;
    margin-left: 20rpx;
  }
}
</style>
