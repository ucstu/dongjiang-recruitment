<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="total">
          <div class="top">
            <div class="first-line">
              <el-select
                v-model="valueMap.status"
                class="m-2"
                placeholder="按反馈"
                clearable
                @change="handleChange"
              >
                <el-option
                  v-for="(item, index) in feedbackMap"
                  :key="item"
                  :label="item"
                  :value="index + 1"
                />
              </el-select>
              <el-select
                v-model="valueMap.workingYears"
                class="m-2"
                placeholder="工作经验"
                clearable
                @change="handleChange"
              >
                <el-option
                  v-for="(item, index) in workExperience"
                  :key="item"
                  :label="item"
                  :value="index + 1"
                />
              </el-select>
              <div style="width: 350px">
                <el-date-picker
                  v-model="workTimeing"
                  style="width: 330px"
                  type="daterange"
                  range-separator="到"
                  start-placeholder="开始时间"
                  end-placeholder="结束时间"
                  @change="handleWorkTimeChange(workTimeing)"
                />
              </div>
            </div>
            <div class="second-line">
              <el-select
                v-model="valueMap.sexs"
                class="m-2"
                placeholder="性别"
                clearable
                @change="handleChange"
              >
                <el-option
                  v-for="item in gander"
                  :key="item"
                  :label="item"
                  :value="item"
                />
              </el-select>
              <el-select
                v-model="Ages"
                class="m-2"
                placeholder="年龄"
                clearable
                @change="handleAgeChange"
              >
                <el-option
                  v-for="(item, index) in ages"
                  :key="index"
                  :label="index"
                  :value="index"
                />
              </el-select>
              <el-input
                v-model="valueMap.userName"
                input-style="max-width: 350px;"
                placeholder="输入姓名查找"
                :prefix-icon="Search"
                clearable
                @change="handleChange"
              />
            </div>
          </div>
          <div class="resume">
            <el-scrollbar height="490px">
              <ResumeInfo
                :user-informations="userInformations"
                :job-informations="jobInformations"
                :delivery-records-checkeds="deliveryRecordsCheckeds"
                @sub-checked="handleChecked"
              >
              </ResumeInfo>
            </el-scrollbar>
          </div>
          <ResumeFooter
            :total="total"
            :delivery-records-checkeds="deliveryRecordsCheckeds"
            @change-state="changState"
            @submit-page="submitPage"
            @submit-checked="submitChecked"
            @submit-interview-time="submitInterviewTime"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import useDate from "@/hooks/useDate";
import useGetDayAll from "@/hooks/useGetdata";
import {
  getCompanyInfosP0DeliveryRecords,
  getCompanyInfosP0PositionInfosP1,
  getUserInfosP0,
  putUserInfosP0DeliveryRecordsP1,
} from "@/services/services";
import {
  DeliveryRecord,
  GetCompanyInfosP0DeliveryRecordsQueryParams,
  PositionInformation,
  UserInformation,
} from "@/services/types";
import { useMainStore } from "@/stores/main";
import { failResponseHandler } from "@/utils/handler";
import { Search } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import ResumeInfo from "../Interview/resumeInfo.vue";
import ResumeFooter from "./ResumeFooter.vue";
interface DeliveryRecordChecked extends DeliveryRecord {
  checked: boolean;
}
const interviewTime = ref("");
const store = useMainStore();
const dialogTableVisible = ref(false);
const deliveryRecords = ref<DeliveryRecord[]>([]);
const userInformations = ref<Map<string, UserInformation>>(new Map());
const jobInformations = ref<Map<string, PositionInformation>>(new Map());
const workTimeing = ref([]);
const deliveryDates = ref<Array<`${number}-${number}-${number}`>>([]);
const submitInterviewTime = (data: { time: string }) => {
  interviewTime.value = data.time;
};
const totalCount = ref(0);
const total = computed(() => {
  let num: number = (totalCount.value / 7) * 10;
  return Math.ceil(num);
});
const deliveryRecordsCheckeds = ref<DeliveryRecordChecked[]>([]);
// 确定面试时间设置
const confirmInterviewTime = (delivery: DeliveryRecordChecked) => {
  dialogTableVisible.value = false;
  putUserInfosP0DeliveryRecordsP1(
    delivery.userInformationId,
    delivery.deliveryRecordId,
    delivery
  ).then(() => {
    ElMessage.success("操作成功");
  });
};
const Ages = ref<Array<number>>([]);
// 创建一个将在年龄更改时调用的函数。
const handleAgeChange = (value: string) => {
  valueMap.value.ages = ages.value[value];
  handleChange();
};

// 选中或取消选中复选框时调用的函数将映射内容返回字符放入选择器显示。
const submitChecked = (data: { checked: boolean }) => {
  deliveryRecordsCheckeds.value.map(
    (deliveryRecordsChecked: DeliveryRecordChecked) => {
      deliveryRecordsChecked.checked = data.checked;
    }
  );
};
const valueMap = ref<GetCompanyInfosP0DeliveryRecordsQueryParams>({
  status: [1, 2, 3, 4],
  size: 7,
  deliveryDates: deliveryDates.value,
  page: 0,
});
const submitPage = (data: { type: string; data: number }) => {
  valueMap.value.page = data.data - 1;
  handleChange();
};

const changState = (val: { state: 1 | 2 | 3 | 4 | 5 }) => {
  if (deliveryRecordsCheckeds.value) {
    //变更状态函数，将选中的简历信息的状态进行变更
    const newDeliver = deliveryRecordsCheckeds.value.filter(
      (deliveryRecordsChecked: DeliveryRecordChecked) => {
        return deliveryRecordsChecked.checked === true;
      }
    );
    if (newDeliver.length > 0) {
      if (val.state === 4) {
        //邀请面试打开寻找日期页面
        if (interviewTime.value) {
          newDeliver.map((delivery: DeliveryRecordChecked) => {
            delivery.status = val.state;
            delivery.interviewTime = interviewTime.value;
            confirmInterviewTime(delivery);
          });
          handleChange();
          interviewTime.value = "";
        } else {
          ElMessage.warning("请选择面试时间");
        }
      } else {
        newDeliver.map((delivery: DeliveryRecordChecked) => {
          delivery.status = val.state;
          delivery.interviewTime = interviewTime.value;
          confirmInterviewTime(delivery);
        });
        handleChange();
      }
    } else {
      ElMessage.error("请选择简历");
    }
  }
};

// 用于检查是否勾选的功能。
const handleChecked = (deliveryRecordId: string) => {
  if (deliveryRecordsCheckeds.value) {
    deliveryRecordsCheckeds.value.map((deliver: DeliveryRecordChecked) => {
      if (deliver.deliveryRecordId === deliveryRecordId) {
        deliver.checked = !deliver.checked;
      }
    });
  }
};

getCompanyInfosP0DeliveryRecords(
  store.companyInformation.companyInformationId,
  valueMap.value
)
  .then((res) => {
    totalCount.value = res.data.body.totalCount;
    deliveryRecords.value = res.data.body.deliveryRecords;
    deliveryRecords.value.forEach((item) => {
      deliveryRecordsCheckeds.value.push(
        Object.assign(item, { checked: false })
      );
      getUserInfosP0(item.userInformationId)
        .then((response) => {
          userInformations.value.set(
            item.userInformationId,
            response.data.body
          );
        })
        .catch(failResponseHandler);
      getCompanyInfosP0PositionInfosP1(
        store.companyInformation.companyInformationId,
        item.positionInformationId
      )
        .then((respones) => {
          jobInformations.value.set(
            item.positionInformationId,
            respones.data.body
          );
        })
        .catch(failResponseHandler);
    });
  })
  .catch(failResponseHandler);

const handleChange = () => {
  getCompanyInfosP0DeliveryRecords(
    store.companyInformation.companyInformationId,
    valueMap.value
  )
    .then((res) => {
      totalCount.value = res.data.body.totalCount;
      deliveryRecords.value = res.data.body.deliveryRecords;
      deliveryRecordsCheckeds.value = [];
      deliveryRecords.value.forEach((item) => {
        deliveryRecordsCheckeds.value.push(
          Object.assign(item, { checked: false })
        );
        getUserInfosP0(item.userInformationId)
          .then((response) => {
            userInformations.value.set(
              item.userInformationId,
              response.data.body
            );
          })
          .catch(failResponseHandler);
        getCompanyInfosP0PositionInfosP1(
          store.companyInformation.companyInformationId,
          item.positionInformationId
        )
          .then((respones) => {
            jobInformations.value.set(
              item.positionInformationId,
              respones.data.body
            );
          })
          .catch(failResponseHandler);
      });
    })
    .catch(failResponseHandler);
};
const handleWorkTimeChange = (val: Array<string>) => {
  if (val !== null) {
    valueMap.value.deliveryDates = useGetDayAll(
      useDate(val[0]),
      useDate(val[1])
    );
  } else {
    valueMap.value.deliveryDates = [];
  }
  handleChange();
};
const feedbackMap = ["待查看", "已查看", "通过筛选", "约面试"];
const gander = ["男", "女"];
const workExperience = ["经验不限", "在校/应届", "3-5年", "5-10年", "10年以上"];
const ages = ref<{ [key: string]: Array<number> }>({
  "18-25岁": [18, 19, 20, 21, 22, 23, 24, 25],
  "25-35岁": [26, 27, 28, 29, 30, 31, 32, 33, 34, 35],
  "35-45岁": [36, 37, 38, 39, 40, 41, 42, 43, 44, 45],
  "45-55岁": [46, 47, 48, 49, 50, 51, 52, 53, 54, 55],
  "55岁以上": [56, 57, 58, 59, 60, 61, 62, 63, 64, 65],
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
            justify-content: space-between;
            height: 50px;

            ::v-deep .el-data-picker {
              max-width: 200px;
              margin: 0 2px;
            }
          }

          .second-line {
            display: flex;
            align-items: center;
            justify-content: space-between;
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
      }
    }
  }
}

.demo-date-picker {
  display: flex;
  flex-wrap: wrap;
  width: 300px;
  padding: 0;
}

.demo-date-picker .block {
  flex: 1;
  padding: 30px 0;
  text-align: center;
  border-right: solid 1px var(--el-border-color);
}

.demo-date-picker .block:last-child {
  border-right: none;
}
</style>
