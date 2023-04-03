<template>
  <div>
    <SystemHeader />
  </div>
  <div class="beneath">
    <div class="main">
      <div class="content">
        <div class="solution">
          <span
            >{{
              ho < 9
                ? "早上好"
                : ho < 12
                ? "上午好"
                : ho < 15
                ? "中午好"
                : ho < 19
                ? "下午好"
                : "晚上好"
            }}，{{ store.hrInformation.hrName }}</span
          >
          <span>时间和注意力是你最宝贵的财富！~</span>
        </div>
        <div class="label">
          <div>
            <span>{{ num.count }}</span>
            <span>新简历</span>
          </div>
          <div>
            <span>{{ num.countCommunication }}</span>
            <span>待沟通</span>
          </div>
          <div>
            <span>{{ num.countInterviewed }}</span>
            <span> 今日待面试</span>
          </div>
          <div @click="goPosition">
            <span>{{ recruitmentPosition }}</span>
            <span>在招职位数</span>
          </div>
        </div>
        <div class="bottom">
          <div class="notice">
            <div class="whole">
              <span>全部({{ interviewNum.length }})</span>
              <el-divider direction="vertical" />
              <span>面试({{ num.count }})</span>
            </div>
            <div class="add"></div>
          </div>
          <div class="time-line">
            <el-timeline>
              <el-timeline-item
                v-for="interview in interviewNum"
                :key="interview.updatedAt"
                :timestamp="interview.createdAt"
                placement="top"
              >
                <el-card class="el-card-define">
                  <div class="card">
                    <div class="left">
                      <img src="@/assets/message.png" alt="" />
                      <div>
                        <h4>面试提醒</h4>
                        <div class="hint">
                          <p>
                            候选人:{{
                              userInformations.get(interview.applicantId)
                                ?.firstName +
                              "" +
                              userInformations.get(interview.applicantId)
                                ?.lastName
                            }}
                          </p>
                          <el-divider direction="vertical" />
                          <p>
                            应聘职位：{{
                              jobInformations.get(interview.positionId)
                                ?.positionName
                            }}
                          </p>
                        </div>
                        <p>
                          面试时间：{{ interview.interviewTime || "未邀请" }}
                        </p>
                      </div>
                    </div>
                    <div class="right">
                      <el-button
                        type="primary"
                        @click="inspectionResume(interview)"
                        >查看简历</el-button
                      >
                    </div>
                  </div>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import SystemHeader from "@/components/System/SystemHeader.vue";
import useDate from "@/hooks/useDate";
import router from "@/router";
import { useMainStore } from "@/stores/main";
import type {
  Applicant,
  DeliveryRecord,
  Position,
} from "@dongjiang-recruitment/service-common";

const store = useMainStore();
const ho = new Date().getHours();
const day = useDate(new Date());
const interviewNum = ref<DeliveryRecord[]>([]);
const num = ref({
  count: 0,
  countCommunication: 0,
  countInterviewed: 0,
});
const userInformations = ref<Map<string, Applicant>>(new Map());
const jobInformations = ref<Map<string, Position>>(new Map());
interface Record {
  status: Array<1 | 2 | 3 | 4 | 5>;
  ages?: Array<1 | 2 | 3 | 4 | 5>;
  deliveryDates?: Array<`${number}-${number}-${number}`>;
  page?: number;
  positionInfoIds?: Array<string>;
  search?: string;
  sexs?: Array<"男" | "女" | "未知">;
  size?: number;
  sort?: Array<`${keyof DeliveryRecord},${"desc" | "asc"}`>;
  workingYears?: Array<1 | 2 | 3 | 4 | 5 | 6>;
}
const valueMap = ref<Record>({
  status: [1, 2, 3, 4],
});
const recruitmentPosition = ref(0);
// 获取位置信息的总数。
companyPositionService
  .queryPosition({
    companyId: store.companyInformation.id,
    size: 0,
  })
  .then((res) => {
    recruitmentPosition.value = res.total;
  });

// 获取面试信息
applicantService
  .queryAllDeliveryRecord({
    query: {
      companyId: ["$eq", store.companyInformation.id],
      status: ["$in", ...valueMap.value.status],
    },
  })
  .then((res) => {
    interviewNum.value = res.items;
    interviewNum.value.forEach((item) => {
      companyPositionService
        .getPosition({
          companyId: item.companyId,
          id: item.positionId,
        })
        .then((response) => {
          jobInformations.value.set(item.positionId, response);
        });
      applicantService
        .getApplicant({
          id: item.applicantId,
        })
        .then((responseable) => {
          userInformations.value.set(item.applicantId, responseable);
        });

      if (item.status === 1) {
        num.value.countCommunication = num.value.countCommunication + 1;
        if (useDate(item.createdAt) === day) {
          num.value.count = num.value.count + 1;
        }
      } else if (item.status === 4 && item.interviewTime === day) {
        num.value.countInterviewed = num.value.countInterviewed + 1;
      }
    });
  });

const goPosition = () => {
  router.push("/System/Position");
};

const inspectionResume = (delivery: DeliveryRecord) => {
  // 变更状态函数，将选中的简历信息的状态进行变更
  if (delivery.status === 1) {
    delivery.status = 2;
    applicantDeliveryRecordService
      .updateDeliveryRecord({
        applicantId: delivery.applicantId,
        id: delivery.id,
        requestBody: delivery,
      })
      .then(() => {
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

<style scoped lang="scss">
.beneath {
  display: flex;
  justify-content: center;
  width: 100%;
  height: auto;

  .main {
    display: flex;
    justify-content: center;
    width: 95%;
    height: auto;
    margin-top: 25px;
    border: solid 1px #ccc;
    border-radius: 10px;

    .content {
      width: 90%;
      margin-top: 45px;

      .solution {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 45px;

        :nth-child(2) {
          font-size: 16px;
          color: #ccc;
          letter-spacing: 2px;
        }
      }

      .label {
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 100%;
        height: 100px;
        margin-top: 30px;
        background-color: rgb(250 250 250);
        border: solid 2px #f5f6f7;

        div {
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          width: 100%;
          height: 100%;
          font-size: 18px;
          font-weight: 400;
          letter-spacing: 2px;

          span {
            text-align: center;
          }
        }
      }

      .bottom {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: auto;
        margin-top: 30px;

        .notice {
          display: flex;
          align-items: center;
          justify-content: space-between;
          width: 100%;
          height: 50px;
          background-color: rgb(250 250 250);
          border: solid 1px #f3f4f5;

          .whole {
            height: 21px;
            margin-left: 30px;

            :first-child {
              color: rgb(0 179 139);
            }
          }

          .add {
            display: flex;
            align-items: center;
            height: 21px;
            margin-right: 30px;
          }
        }

        .time-line {
          height: auto;
          margin-top: 40px;

          .card {
            display: flex;
            align-items: center;
            justify-content: space-between;

            .left {
              display: flex;
              align-items: center;

              img {
                width: 40px;
                height: 40px;
              }

              .hint {
                display: flex;
                align-items: center;
              }
            }
          }
        }
      }
    }
  }
}
</style>
