<template>
  <NavigationBar title="投递记录" right="清空" @right-click="clearRecord" />
  <view class="flex-col page">
    <view class="justify-between items-center group-1">
      <text
        v-for="(send, i) in sendType"
        v-show="send !== ''"
        :key="i"
        :class="sendId === i ? 'active' : ''"
        @click="sendTypeId(i)"
        >{{ send }}</text
      >
    </view>
    <view class="flex-col list">
      <JobPanel
        v-for="(deliveryRecord, i) in deliveryRecords"
        :key="i"
        class="list-item"
        :collection-position="deliveryRecord"
        :send-type="sendType[sendId]"
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
import {
deleteUserInfosP0DeliveryRecordsP1,
getCompanyInfosP0PositionInfosP1,
getUserInfosP0DeliveryRecords
} from "@/services/services";
import { DeliveryRecord, PositionInformation } from "@/services/types";
import { useAuthStore } from "@/stores/auth";
import { failResponseHandler } from "@/utils/handler";
const store = useAuthStore();

const deliveryRecords = ref<PositionInformation[]>([]);
const deliveryLength = ref();
const sendType = ["", "待查看", "已查看", "通过初筛", "约面试", "不合格"];
const sendId = ref<DeliveryRecord["status"]>(1);
const emptyShow = ref(true);

/* 默认查看记录 */

getUserInfosP0DeliveryRecords(store.account.fullInformationId, {
  status: [1],
  size: 10,
})
  .then((res) => {
    deliveryLength.value = res.data.body.deliveryRecords;
    for (const delivery of deliveryLength.value) {
      getCompanyInfosP0PositionInfosP1(
        delivery.companyInformationId,
        delivery.positionInformationId
      )
        .then((res) => {
          res.data.body["companyInformationId"] = delivery.companyInformationId;
          deliveryRecords.value.push(res.data.body);
          if (deliveryRecords.value.length) {
            emptyShow.value = false;
          }
        })
        .catch(failResponseHandler);
    }
  })
  .catch(failResponseHandler);

onShow(() => {
  if (deliveryLength.value === null) {
    deliveryRecords.value = [];
  }
});

/* 查看不同状态记录 */
const sendTypeId = (index: number) => {
  sendId.value = index as DeliveryRecord["status"];
  getUserInfosP0DeliveryRecords(store.account.fullInformationId, {
    status: index as unknown as (2 | 1 | 3 | 4 | 5)[],
  })
    .then((res) => {
      deliveryRecords.value.length = 0;
      if (!res.data.body.deliveryRecords.length) {
        emptyShow.value = true;
      } else {
        for (const delivery of res.data.body.deliveryRecords) {
          getCompanyInfosP0PositionInfosP1(
            delivery.companyInformationId,
            delivery.positionInformationId
          )
            .then((res) => {
              res.data.body["companyInformationId"] =
                delivery.companyInformationId;
              deliveryRecords.value.push(res.data.body);
            })
            .catch(failResponseHandler);
        }
        emptyShow.value = false;
      }
    })
    .catch(failResponseHandler);
};
/* 清空记录 */
const clearRecord = () => {
  for (const delivery of deliveryLength.value) {
    deleteUserInfosP0DeliveryRecordsP1(
      store.account.fullInformationId,
      delivery.deliveryRecordId
    )
      .then((res) => {
        deliveryLength.value = null;
        deliveryRecords.value.length = 0;
      })
      .catch(failResponseHandler);
  }
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 100%;
  height: auto;

  .active {
    color: rgb(35 193 158);
  }

  .group-1 {
    width: 710rpx;
    height: 50rpx;
    margin-top: 30rpx;
    margin-left: 20rpx;
    font-size: 25rpx;
    color: rgb(0 0 0 / 50%);
  }

  .list {
    width: 690rpx;
    height: auto;
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
