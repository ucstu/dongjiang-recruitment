<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="total">
          <!-- <div class="top">
            <div class="first-line">
              <h1>面试时间：</h1>
              <el-date-picker
                v-model="workTimeing"
                type="daterange"
                range-separator="到"
                start-placeholder="开始时间"
                end-placeholder="结束时间"
                @change="handleWorkTimeChange(workTimeing)"
              />
            </div>
          </div> -->
          <div class="resume">
            <el-scrollbar height="400px">
              <ResumeInfo
                :user-informations="userInformations"
                :job-informations="jobInformations"
                :delivery-records-checkeds="deliveryRecordsCheckeds"
                :checked="checked1"
              />
            </el-scrollbar>
          </div>
          <div class="footer">
            <div>
              <el-checkbox v-model="totalSelect" label="全选" size="large" />
              <!-- <el-button
                type="primary"
                @click="changeState(3 as 1 | 2 | 3 | 4 | 5 )"
                >发出offer</el-button
              > -->
              <el-popconfirm title="确定删除该简历?">
                <template #reference>
                  <el-button
                    type="primary"
                    plain
                    @click="changeState(5 as 1 | 2 | 3 | 4 | 5)"
                    >删除简历</el-button
                  >
                </template>
              </el-popconfirm>
            </div>
            <el-pagination
              background
              layout="prev, pager, next"
              :total="total"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDate from "@/hooks/useDate";
import useGetDayAll from "@/hooks/useGetdata";
import { useMainStore } from "@/stores/main";
import type {
Applicant,
DeliveryRecord,
Position,
} from "@dongjiang-recruitment/service-common";
import { ElMessage } from "element-plus";
import ResumeInfo from "./resumeInfo.vue";
const store = useMainStore();
const deliveryRecords = ref<DeliveryRecord[]>([]);
const checked1 = ref(false);

interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}

const deliveryRecordsCheckeds = ref<DeliveryRecordChecked[]>([]);
const userInformations = ref<Map<string, Applicant>>(new Map());
const jobInformations = ref<Map<string, Position>>(new Map());
const deliveryDates = ref<Array<string>>(["2022-05-01", "2022-06-01"]);
const workTimeing = ref([]);
const handleWorkTimeChange = (val: Array<string>) => {
  if (val !== null) {
    deliveryDates.value = useGetDayAll(useDate(val[0]), useDate(val[1]));
  } else {
    deliveryDates.value = [];
  }
  applicantService
    .queryAllDeliveryRecord({
      query: {
        "company.id": ["$eq", store.companyInformation.id],
        status: ["$eq", 4],
        interviewTime: ["$in", ...deliveryDates.value],
      },
    })
    .then((res) => {
      totalCount.value = res.total;
      deliveryRecordsCheckeds.value = [];
      deliveryRecords.value = res.items;
      deliveryRecords.value.forEach((item) => {
        deliveryRecordsCheckeds.value.push(
          Object.assign(item, { checked: false })
        );
        applicantService
          .getApplicant({
            id: item.applicant.id,
          })
          .then((response) => {
            userInformations.value.set(item.applicant.id, response);
          });
        companyPositionService
          .getPosition({
            companyId: store.companyInformation.id,
            id: item.position.id,
          })
          .then((response) => {
            jobInformations.value.set(item.position.id, response);
          });
      });
    });
};
// 更改所选简历信息状态的功能。
const changeState = (val: 1 | 2 | 3 | 4 | 5) => {
  if (deliveryRecordsCheckeds.value) {
    //变更状态函数，将选中的简历信息的状态进行变更
    const newDeliver = deliveryRecordsCheckeds.value.filter(
      (deliveryRecordsChecked: DeliveryRecordChecked) => {
        return deliveryRecordsChecked.checked === true;
      }
    );
    // 更改所选简历信息的状态。
    newDeliver.map((delivery: DeliveryRecordChecked) => {
      delivery.status = val;
      applicantDeliveryRecordService
        .updateDeliveryRecord({
          applicantId: delivery.applicant.id,
          id: delivery.id,
          requestBody: delivery,
        })
        .then(() => {
          ElMessage.success("操作成功");
        });
    });
  }
};
const submitChecked = (data: any) => {
  deliveryRecordsCheckeds.value.map(
    (deliveryRecordsChecked: DeliveryRecordChecked) => {
      deliveryRecordsChecked.checked = data;
    }
  );
};
// 计算属性。
const totalli = computed(() => {
  return deliveryRecordsCheckeds.value.length;
});
// 一个计算函数，返回检查项目的数量。
const totalDone = computed(() => {
  return deliveryRecordsCheckeds.value.reduce(
    (per, cur) => per + (cur.checked ? 1 : 0),
    0
  );
});

// 计算属性。
const totalSelect = computed({
  get() {
    return totalDone.value === totalli.value && totalli.value > 0;
  },
  set(value) {
    submitChecked(value);
  },
});
const totalCount = ref(0);
const total = computed(() => {
  let num: number = (totalCount.value / 7) * 10;
  return Math.ceil(num);
});

applicantService
  .queryAllDeliveryRecord({
    query: {
      "company.id": ["$eq", store.companyInformation.id],
      status: ["$eq", 4],
    },
  })
  .then((res) => {
    totalCount.value = res.total;
    deliveryRecords.value = res.items;
    deliveryRecords.value.forEach((item) => {
      deliveryRecordsCheckeds.value.push(
        Object.assign(item, { checked: false })
      );
      applicantService
        .getApplicant({
          id: item.applicant.id,
        })
        .then((response) => {
          userInformations.value.set(item.applicant.id, response);
        });
      companyPositionService
        .getPosition({
          companyId: store.companyInformation.id,
          id: item.position.id,
        })
        .then((response) => {
          jobInformations.value.set(item.position.id, response);
        });
    });
  });
</script>

<style scoped lang="scss">
.content {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background-color: rgb(245 245 250);

  .main {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;

    .center {
      box-sizing: border-box;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 95%;
      background: #fff;
      border: 1px solid #d5d6d7;

      .total {
        width: 95%;
        height: 680px;

        .top {
          display: flex;
          flex-direction: column;
          justify-content: center;
          margin-top: 20px;

          .first-line {
            display: flex;
            align-items: center;
            height: 50px;

            .el-data-picker {
              width: 100%;
            }
          }
        }

        .resume {
          height: 490px;
          margin-top: 30px;
          overflow-y: hidden;
          border: solid 1px #d5d6d7;

          .scrollbar-demo-item {
            display: flex;
            align-items: center;
            justify-content: center;
            width: 100%;
            height: 50px;
            margin: 10px;
            color: var(--el-color-primary);
            text-align: center;
            background: var(--el-color-primary-light-9);
            border-radius: 4px;
          }
        }

        .footer {
          display: flex;
          justify-content: space-between;
          width: 100%;
          margin-top: 10px;

          .el-checkbox {
            margin-right: 20px;
          }
        }
      }
    }
  }
}
</style>
