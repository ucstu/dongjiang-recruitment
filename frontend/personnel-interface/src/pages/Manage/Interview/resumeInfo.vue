<template>
  <div
    v-for="deliveryRecordsChecked in props.deliveryRecordsCheckeds"
    :key="deliveryRecordsChecked.deliveryRecordId"
    class="resume-item"
  >
    <div class="resume-item">
      <div class="item-header">
        <input
          type="checkbox"
          :checked="deliveryRecordsChecked.checked"
          @change="handleChecked(deliveryRecordsChecked.deliveryRecordId)"
        />
        <img
          :src="
            VITE_CDN_URL +
            userInformations.get(deliveryRecordsChecked.userInformationId)
              ?.avatarUrl
          "
          alt=""
        />
        <div class="header-person">
          <div>
            <span>{{
              userInformations.get(deliveryRecordsChecked.userInformationId)
                ?.firstName +
              "" +
              userInformations.get(deliveryRecordsChecked.userInformationId)
                ?.lastName
            }}</span>
            <span
              >·{{
                userInformations.get(deliveryRecordsChecked.userInformationId)
                  ?.sex
              }}·<span>{{
                userInformations.get(deliveryRecordsChecked.userInformationId)
                  ?.age
              }}</span
              >岁·<span
                >{{educations[userInformations.get(deliveryRecordsChecked.userInformationId)?.education as 1 | 2 | 3 | 4]}}</span
              >·{{slution[userInformations.get(deliveryRecordsChecked.userInformationId)?.jobStatus as 1 | 2 | 3 ]
              }}</span
            >
          </div>
          <div>
            <span
              >想找：{{
                userInformations.get(deliveryRecordsChecked.userInformationId)
                  ?.cityName
              }}</span
            >|<span
              >{{
                jobInformations.get(
                  deliveryRecordsChecked.positionInformationId
                )?.positionName
              }}|{{
                jobInformations.get(
                  deliveryRecordsChecked.positionInformationId
                )?.startingSalary +
                "K-" +
                jobInformations.get(
                  deliveryRecordsChecked.positionInformationId
                )?.ceilingSalary +
                "K"
              }}</span
            >
          </div>
        </div>
      </div>
      <div class="resume-label">
        {{ " 求高薪 | 求稳定 | 求发展 " }}
      </div>
      <div class="right">
        <el-button
          type="primary"
          @click="inspectionResume(deliveryRecordsChecked)"
          >查看简历</el-button
        >
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import router from "@/router";
import { putUserInfosP0DeliveryRecordsP1 } from "@/services/services";
import {
  DeliveryRecord,
  PositionInformation,
  UserInformation,
} from "@/services/types";
export interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}
let props = defineProps({
  deliveryRecordsCheckeds: {
    type: Array as PropType<DeliveryRecordChecked[]>,
    default: () => [],
  },
  userInformations: {
    type: Map as PropType<Map<string, UserInformation>>,
    default: () => new Map(),
  },
  jobInformations: {
    type: Map as PropType<Map<string, PositionInformation>>,
    default: () => new Map(),
  },
});

let emit = defineEmits(["sub-checked"]);

const handleChecked = (deliveryRecordId: string) => {
  emit("sub-checked", deliveryRecordId);
};
// watch(
//   () => props.deliveryRecordsCheckeds,
//   (val) => {
//     delivers.value = val;
//   },
//   { deep: true }
// );
watchEffect(() => {
  let delivery = props.deliveryRecordsCheckeds;
});
const VITE_CDN_URL = import.meta.env.VITE_CDN_URL as string;
const slution = { 1: "随时入职", 2: "2周内入职", 3: "1月内入职" };
const educations = { 1: "大专", 2: "本科", 3: "硕士", 4: "博士" };
const inspectionResume = (delivery: any) => {
  // 变更状态函数，将选中的简历信息的状态进行变更
  if (delivery.status === 1) {
    delivery.status = 2;
    putUserInfosP0DeliveryRecordsP1(
      delivery.userInformationId,
      delivery.deliveryRecordId,
      delivery
    ).then(() => {
      router.push({
        name: "Resume",
        params: {
          userId: delivery.userInformationId,
          postId: delivery.positionInformationId,
        },
      });
    });
  } else {
    router.push({
      name: "Resume",
      params: {
        userId: delivery.userInformationId,
        postId: delivery.positionInformationId,
      },
    });
  }
};
</script>

<style lang="scss" scoped>
.resume-item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 70px;
  border-bottom: solid 1px rgb(221 221 221);

  .item-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 40%;
    margin-left: 15px;

    img {
      position: absolute;
      left: 30px;
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }

    .header-person {
      position: absolute;
      left: 100px;
      display: flex;
      flex-direction: column;
      width: 100%;
      font-size: 7px;

      div {
        display: flex;
        width: 100%;
        height: 100%;
      }
    }
  }

  .resume-label {
    position: absolute;
    left: 45%;
  }

  .right {
    margin-right: 10px;
  }
}
</style>
