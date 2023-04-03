<template>
  <div class="content">
    <div class="main">
      <div class="center">
        <div class="total">
          <div class="top">
            <div class="first-line">
              <el-select
                v-model="valueMap.state"
                class="m-2"
                placeholder="按反馈"
              >
                <el-option
                  v-for="(item, index) in feedbackMap"
                  :key="item"
                  :label="item"
                  :value="index - 1"
                />
              </el-select>
              <el-select
                v-model="valueMap.workingYears"
                class="m-2"
                placeholder="工作经验"
              >
                <el-option
                  v-for="(item, index) in workExperience"
                  :key="item"
                  :label="item"
                  :value="index - 1"
                />
              </el-select>

              <el-select
                v-model="valueMap.education"
                class="m-2"
                placeholder="学历"
              >
                <el-option
                  v-for="(item, index) in educationMap"
                  :key="item"
                  :label="item"
                  :value="index - 1"
                />
              </el-select>
            </div>
            <div class="second-line">
              <el-select v-model="valueMap.sex" class="m-2" placeholder="性别">
                <el-option
                  v-for="(item, index) in gander"
                  :key="item"
                  :label="item"
                  :value="index - 1"
                />
              </el-select>
              <el-select v-model="valueMap.age" class="m-2" placeholder="年龄">
                <el-option
                  v-for="(item, index) in age"
                  :key="item"
                  :label="item"
                  :value="index - 1"
                />
              </el-select>

              <el-input
                v-model="valueMap.search"
                class="w-50 m-2"
                input-style="max-width: 215px;"
                placeholder="输入搜索内容"
                :prefix-icon="Search"
              />
            </div>
          </div>
          <div class="resume">
            <el-scrollbar height="490px">
              <template v-if="TalentInfo[0].jobExpectationId">
                <div
                  v-for="Talent in TalentInfo"
                  :key="Talent.applicantId"
                  class="resume-item"
                >
                  <div class="item-header">
                    <el-checkbox v-model="Talent.checked" />
                    <img :src="VITE_CDN_URL + Talent.avatarUrl" alt="avatar" />
                    <div class="header-person">
                      <span>{{
                        (Talent.firstName as string) + Talent.lastName
                      }}</span>
                      <span
                        >{{ Talent.sex }}·{{ Talent.age }}岁·{{
                          Talent.education
                        }}·{{ slution[(Talent.jobStatus as number) + 1] }}</span
                      >
                      <span
                        >想找：{{ Talent.cityName }}|{{
                          Talent.positionName
                        }}|{{
                          Talent.startingSalary + "-" + Talent.ceilingSalary
                        }}</span
                      >
                    </div>
                  </div>
                  <div class="resume-label">
                    {{ " 求高薪 | 求稳定 | 求发展 " }}
                  </div>
                  <div>
                    <el-button
                      type="primary"
                      @click="inspectionResume(Talent.applicantId as string)"
                    >
                      查看简历</el-button
                    >
                  </div>
                </div>
              </template>
            </el-scrollbar>
          </div>
          <ResumeFooter />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import router from "@/router";
import type {
  Applicant,
  JobExpectation,
} from "@dongjiang-recruitment/service-common";
import { Search } from "@element-plus/icons-vue";
import ResumeFooter from "../Resume/ResumeFooter.vue";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL as string;
const valueMap = ref({
  age: "",
  deliveryDate: "",
  jobId: "",
  search: "",
  sex: "",
  state: "",
  workingYears: "",
  education: "",
});

const checked = ref({ checked: false });
const feedbackMap = ["待查看", "已查看", "通过筛选", "约面试", "不合适"];

const gander = ["男", "女"];
const workExperience = ["1年以下", "1-3年", "3-5年", "5-10年", "10年以上"];
const age = ["18-25", "25-35", "35-45", "45-55", "55-65"];
const slution = ["随时入职", "2周内入职", "1月内入职"];
const educationMap = ["不限", "大专", "本科", "硕士", "博士"];
const userInfo = ref<Applicant>();
const JobExpectative = ref<JobExpectation[]>([]);
// getRecommendations()
//   .then((res) => {
//     const userIds = res.data.body;
//     userIds.map((item) => {
//       getUserInfosP0(item)
//         .then((res) => {
//           userInfo.value = res.data.body;
//         })
//         .catch(failResponseHandler);
//       getUserInfosP0JobExpectations(item, {}).then((res) => {
//         JobExpectative.value = res.data.body.jobExpectations;
//       });
//     });
//   })
//   .catch(failResponseHandler);
const TalentInfo = ref([
  {
    ...{
      ...userInfo.value,
      applicantId: userInfo.value?.id,
    },
    ...{
      ...JobExpectative.value[0],
      jobExpectationId: JobExpectative.value[0].id,
    },
    ...checked.value,
  },
]);

const inspectionResume = (id: string) => {
  router.push({
    name: "Resume",
    params: {
      id: id,
    },
  });
};
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
                font-size: 7px;
              }
            }

            .resume-label {
              position: absolute;
              left: 45%;
            }

            .el-button {
              margin-right: 20px;
            }
          }
        }
      }
    }
  }
}
</style>
