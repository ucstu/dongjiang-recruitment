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
        @state-click="stateClick(interviewedJob.id)"
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
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type {
  DeliveryRecord,
  Position,
} from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const interviewedJobs = ref<Position[]>([]);
const interviewed = ref<DeliveryRecord[]>([]);
const sendType = ref("放弃面试");
const emptyShow = ref(true);

until(
  computed(() => !!mainStore.applicant?.id),
  () => {
    // 查询待面试信息
    applicantDeliveryRecordService
      .queryDeliveryRecord({
        applicantId: mainStore.applicant!.id,
        query: {
          status: ["$eq", 4],
        },
      })
      .then((res) => {
        interviewed.value = res.items;
        for (const interview of interviewed.value) {
          companyPositionService
            .getPosition({
              companyId: interview.companyId,
              id: interview.positionId,
            })
            .then((res) => {
              interviewedJobs.value.push(res);
              if (interviewedJobs.value.length) {
                emptyShow.value = false;
              }
            });
        }
      });
  }
);

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
    if (delivery.positionId === index) {
      applicantDeliveryRecordService
        .removeDeliveryRecord({
          applicantId: mainStore.applicant!.id,
          id: delivery.id,
        })
        .then(() => {
          interviewed.value = interviewed.value.filter(
            (item) => item.id !== delivery.id
          );
          interviewedJobs.value = interviewedJobs.value.filter(
            (item) => item.id !== delivery.companyId
          );
        });
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
