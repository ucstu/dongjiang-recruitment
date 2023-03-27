<template>
  <NavigationBar title="待面试" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobPanel
        v-for="(interviewedJob, i) in interviewedJobs"
        :key="i"
        class="list-item"
        :collection-position="interviewedJob"
        :send-type="sendType"
        @state-click="stateClick(interviewedJob.positionInformationId)"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import JobPanel from "@/components/JobPanel/JobPanel.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useAuthStore } from "@/stores/auth";

const store = useAuthStore();

const interviewedJobs = ref<PositionInformation[]>([]);
const interviewed = ref();
const sendType = ref("放弃面试");
const emptyShow = ref(true);

// 查询待面试信息
getUserInfosP0DeliveryRecords(store.accountInformation.fullInformationId, {
  status: [4],
})
  .then((res) => {
    interviewed.value = res.data.body.deliveryRecords;
    for (const interview of interviewed.value) {
      getCompanyInfosP0PositionInfosP1(
        interview.companyInformationId,
        interview.positionInformationId
      )
        .then((res) => {
          interviewedJobs.value.push(res.data.body);
          if (interviewedJobs.value.length) {
            emptyShow.value = false;
          }
        })
        .catch(failResponseHandler);
    }
  })
  .catch(failResponseHandler);

onShow(() => {
  if (!interviewed.value.length) {
    emptyShow.value = true;
  } else {
    return interviewedJobs.value;
  }
});

/* 放弃面试 */
const stateClick = (index: string) => {
  for (const delivery of interviewed.value) {
    if (delivery.positionInformationId === index) {
      deleteUserInfosP0DeliveryRecordsP1(
        store.accountInformation.fullInformationId,
        delivery.deliveryRecordId
      )
        .then(() => {
          interviewed.value = interviewed.value.filter(
            (item: { deliveryRecordId: any }) =>
              item.deliveryRecordId !== delivery.deliveryRecordId
          );
          interviewedJobs.value = interviewedJobs.value.filter(
            (item: { positionInformationId: any }) =>
              item.positionInformationId !== delivery.positionInformationId
          );
        })
        .catch(failResponseHandler);
    }
  }
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .list {
    width: 690rpx;
    margin-left: 30rpx;

    .list-item {
      &:last-of-type {
        margin-top: 18rpx;
      }
    }
  }
}

.image {
  width: 100%;
  height: auto;
  margin: 10rpx 0 7rpx 7rpx;
}
</style>
