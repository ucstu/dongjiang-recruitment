<template>
  <NavigationBar title="我的查看" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobDetail
        v-for="(myView, i) in myViews"
        :key="i"
        :position="myView"
        @job-click="view_2OnClick(myView.companyId, myView.id)"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useInfoStore } from "@/stores";
import type { Position } from "@dongjiang-recruitment/service-common";

const store = useInfoStore();

const myViews = ref<Position[]>([]);
/* 查询所有查看记录 */
applicantInspectionRecordService
  .queryUserInspectionRecord({
    applicantId: store.applicant!.id,
  })
  .then((res) => {
    for (const item of res.items) {
      companyPositionService
        .getPosition({
          companyId: item.companyId,
          id: item.positionId,
        })
        .then((res) => {
          const p = myViews.value.map((item) => item.id);
          if (!p.includes(res.id)) {
            myViews.value.push(res);
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
