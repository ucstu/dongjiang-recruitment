<template>
  <div
    v-for="deliveryRecordsChecked in props.deliveryRecordsCheckeds"
        :key="deliveryRecordsChecked.id"
      class="resume-item"
    >
      <div class="resume-item">
        <div class="item-header">
          <input
            type="checkbox"
            :checked="deliveryRecordsChecked.checked"
            @change="handleChecked(deliveryRecordsChecked.id)"
          />
          <img
            :src="
              VITE_CDN_URL +
              userInformations.get(deliveryRecordsChecked.applicantId)
                ?.avatarUrl
            "
            alt=""
          />
          <div class="header-person">
            <div>
              <span>{{
                userInformations.get(deliveryRecordsChecked.applicantId)
                  ?.firstName +
                "" +
                userInformations.get(deliveryRecordsChecked.applicantId)
                  ?.lastName
              }}</span>
              <span
                >·{{
                  userInformations.get(deliveryRecordsChecked.applicantId)
                    ?.sex
                }}·<span>{{
  userInformations.get(deliveryRecordsChecked.applicantId)
    ?.age
}}</span
                >岁·<span
                  >{{ educations[userInformations.get(deliveryRecordsChecked.applicantId)?.education as 1 | 2 | 3 | 4] }}</span
                >·{{ slution[userInformations.get(deliveryRecordsChecked.applicantId)?.jobStatus as 1 | 2 | 3 ]
              }}</span
            >
          </div>
          <div>
            <span
              >想找：{{
                userInformations.get(deliveryRecordsChecked.applicantId)
                  ?.cityName
              }}</span
            >|<span
              >{{
                jobInformations.get(
                  deliveryRecordsChecked.positionId
                )?.positionName
              }}|{{
                jobInformations.get(
                  deliveryRecordsChecked.positionId
                )?.startingSalary +
                "K-" +
                jobInformations.get(
                  deliveryRecordsChecked.positionId
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
import type { Applicant, DeliveryRecord, Position } from "@dongjiang-recruitment/service-common";
import type { PropType } from "vue";

export interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}
let props = defineProps({
  deliveryRecordsCheckeds: {
    type: Array as PropType<DeliveryRecordChecked[]>,
    default: () => [],
  },
  userInformations: {
    type: Map as PropType<Map<string, Applicant>>,
    default: () => new Map(),
  },
  jobInformations: {
    type: Map as PropType<Map<string, Position>>,
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
const inspectionResume = (delivery: DeliveryRecordChecked) => {
  // 变更状态函数，将选中的简历信息的状态进行变更
  if (delivery.status === 1) {
    delivery.status = 2;
    applicantDeliveryRecordService.updateDeliveryRecord({
      applicantId: delivery.applicantId,
      id: delivery.id,
      requestBody: delivery,
    }).then(() => {
      router.push({
        name: "Resume",
        params: {
          userId: delivery.applicantId,
          postId: delivery.positionId,
        },
      });
    });
  } else {
    router.push({
      name: "Resume",
      params: {
        userId: delivery.applicantId,
        postId: delivery.positionId,
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
