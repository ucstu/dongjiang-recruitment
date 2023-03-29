<template>
  <NavigationBar title="职位详情" />
  <view class="flex-col page">
    <view class="job-information">
      <view class="flex-row name-salary">
        <view class="name">{{ jobInformation.positionName }}</view>
        <view class="justify-end salary">
          {{ jobInformation.startingSalary }}k-{{
            jobInformation.ceilingSalary
          }}k
        </view>
      </view>
      <view class="flex-row area-require">
        <view class="items-center" style="margin-right: 25rpx">
          <image src="@/static/icons/map.png" />
          <text style="margin-left: 15rpx">{{
            jobInformation.workCityName
          }}</text>
        </view>
        <view class="items-center" style="margin-right: 25rpx">
          <image src="@/static/icons/work.png" />
          <text style="margin-left: 15rpx">{{
            workYears[jobInformation.workingYears]
          }}</text>
        </view>
        <view class="items-center">
          <image src="@/static/icons/training.png" />
          <text style="margin-left: 15rpx">{{
            educates[jobInformation.education]
          }}</text>
        </view>
      </view>
      <view class="flex-row company-info" @click="toCompanyIn">
        <image
          v-if="companyInformation.logoUrl"
          class="items-center logo"
          :src="VITE_CDN_URL + companyInformation.logoUrl"
        />
        <view class="flex-col com-infos">
          <text class="com-name">{{ companyInformation.companyName }}</text>
          <view class="com-info">
            <text>
              {{ financingStages[companyInformation.financingStage] }} |
              {{ scales[companyInformation.scale] }} |
              {{ companyInformation.comprehensionName }}
            </text>
          </view>
        </view>
      </view>
      <view class="job-description">
        <text style="font-size: 30rpx; font-weight: 400">职位描述</text>
        <view class="flex-col description">
          <text style="line-height: 40rpx"
            >职位类型 :{{ positionType[jobInformation.workType] }}</text
          >
          <view class="flex-row">
            <text style="line-height: 40rpx">职位亮点 :</text>
            <view
              v-for="(highlight, i) in jobInformation.highlights"
              :key="i"
              style="margin-left: 15rpx; line-height: 40rpx"
              >{{ highlight }}</view
            >
          </view>
          <view>职位描述：{{ jobInformation.description }}</view>
          <view>所属部门：{{ jobInformation.departmentName }}</view>
          <view>详细地址: {{ jobInformation.workAreaName }}</view>
          <view
            >周末休息时间：{{
              weekendReleaseTime[jobInformation.weekendReleaseTime]
            }}</view
          >
          <view
            >上班时间：{{ jobInformation.workTime }}-{{
              jobInformation.overTime
            }}</view
          >
        </view>
      </view>
      <map
        v-if="jobInformation.workingPlace"
        style="width: 100%; height: 300px; margin-top: 20rpx"
        :latitude="jobInformation.workingPlace.latitude"
        :longitude="jobInformation.workingPlace.longitude"
        :markers="markers"
      >
      </map>
    </view>
    <view> </view>
  </view>
  <view class="flex-row items-center justify-between btn-box">
    <view class="flex-col justify-center items-center" style="padding-left: 4%">
      <image
        v-if="!isCollection"
        class="image-collection"
        src="@/static/icons/collection.svg"
        @click="collection"
      />
      <image
        v-if="isCollection"
        class="image-collection"
        src="@/static/icons/collection-fill.svg"
        @click="collection"
      />
      <text>收藏</text>
    </view>
    <button
      class="justify-center items-center btn-common"
      @click="communication(jobInformation.hrInformationId)"
    >
      立即沟通
    </button>
    <button
      class="justify-center items-center btn-send-resume"
      @click="sendResume"
    >
      投递简历
    </button>
  </view>
  <wybPopup
    ref="popup"
    :show-close-icon="false"
    :height="300"
    :radius="10"
    mode="size-auto"
    type="bottom"
  >
    <view class="send-resume-box">
      <view class="flex-col justify-center resume-box">
        <view
          class="flex-row justify-between items-center resume"
          @click="viewResume"
        >
          <view class="online-resume">
            <text>在线简历</text>
          </view>
          <text>预览 ></text>
        </view>
      </view>
      <button class="items-center justify-center send-box" @click="send">
        确认投递简历
      </button>
    </view>
  </wybPopup>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import {
  deleteUserInfosP0GarnerRecordsP1,
  getCompanyInfosP0,
  getCompanyInfosP0PositionInfosP1,
  getUserInfosP0GarnerRecords,
  postUserInfosP0DeliveryRecords,
  postUserInfosP0GarnerRecords,
} from "@/services/services";
import { CompanyInformation, PositionInformation } from "@/services/types";
import { useAuthStore } from "@/stores/auth";
import { failResponseHandler } from "@/utils/handler";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const store = useAuthStore();

const jobInformation = ref<PositionInformation>({} as PositionInformation); // 职位信息

const educates = ref(["不要求", "大专", "本科", "硕士", "博士"]); //学历要求
const workYears = ref(["经验不限", "在校/应届", "3年以下", "3-5年", "5-10年"]); //工作经验
const positionType = ref(["", "全职", "兼职", "实习"]); // 工作类型
/* 融资阶段 */
const financingStages = [
  "",
  "未融资",
  "天使轮",
  "A轮",
  "B轮",
  "C轮",
  "D轮及以上",
  "上市公司",
  "不需要融资",
];
/* 公司规模 */
const scales = [
  "",
  "少于15人",
  "15-50人",
  "50-150人",
  "150-500人",
  "500-2000人",
  "2000人以上",
];
/* 周末休息时间 */
const weekendReleaseTime = ref(["", "周末双休", "周末单休", "大小周"]);

// 在地图上创建标记。
const markers = ref([
  {
    id: 0,
    latitude: 0,
    longitude: 0,
    iconPath: "../../static/icons/location.svg",
    width: 30,
    height: 30,
  },
]);
const companyInformation = ref<CompanyInformation>({} as CompanyInformation); // 公司信息
const companyId = ref(""); // 公司id
const positionId = ref(""); // 职位id
onLoad((e) => {
  if (e.companyId && e.positionId) {
    companyId.value = e.companyId;
    positionId.value = e.positionId;
    /* 获取职位信息 */
    getCompanyInfosP0PositionInfosP1(companyId.value, positionId.value)
      .then((res) => {
        jobInformation.value = res.data.body;
        markers.value[0].latitude = res.data.body.workingPlace.latitude;
        markers.value[0].longitude = res.data.body.workingPlace.longitude;
      })
      .catch(failResponseHandler);
    getCompanyInfosP0(companyId.value)
      .then((res) => {
        companyInformation.value = res.data.body;
      })
      .catch(failResponseHandler);
  }
});
// 相关公司
const toCompanyIn = () => {
  companyId.value = companyInformation.value.companyInformationId;
  uni.navigateTo({
    url: "/detail/gongsijieshao/gongsijieshao?companyId=" + companyId.value,
  });
};
const popup = ref();
// 收藏职位
const isCollection = ref(false);
const garnerRecordId = ref("");
//判断是否收藏
onMounted(() => {
  getUserInfosP0GarnerRecords(store.account.fullInformationId, {})
    .then((res) => {
      const collectionPosition = res.data.body.garnerRecords.find((item) => {
        return item.positionInformationId === positionId.value;
      });
      if (collectionPosition) {
        isCollection.value = true;
        garnerRecordId.value = collectionPosition.garnerRecordId;
      }
    })
    .catch(failResponseHandler);
});

// 上面的代码是用户点击收藏按钮时调用的函数。
const collection = () => {
  isCollection.value = !isCollection.value;
  // 判断是否收藏
  if (isCollection.value) {
    postUserInfosP0GarnerRecords(store.account.fullInformationId, {
      positionInformationId: positionId.value,
      companyInformationId: companyId.value,
      userInformationId: store.account.fullInformationId,
    })
      .then((res) => {
        uni.showToast({
          title: "收藏成功",
          icon: "none",
          duration: 1500,
        });
      })
      .catch(failResponseHandler);
  } else {
    getUserInfosP0GarnerRecords(store.account.fullInformationId, {})
      .then((res) => {
        const collectionPosition = res.data.body.garnerRecords.find((item) => {
          return item.positionInformationId === positionId.value;
        });
        if (collectionPosition) {
          garnerRecordId.value = collectionPosition.garnerRecordId;
          deleteUserInfosP0GarnerRecordsP1(
            store.account.fullInformationId,
            garnerRecordId.value
          )
            .then(() => {
              uni.showToast({
                title: "取消收藏",
                icon: "none",
                duration: 1500,
              });
            })
            .catch(failResponseHandler);
        }
      })
      .catch(failResponseHandler);
  }
};
// 沟通HR
const communication = (i: string) => {
  let messageKey = "";
  for (const key in store.messages[store.account.fullInformationId]) {
    if (key === jobInformation.value.hrInformationId) {
      messageKey = key;
    } else {
      messageKey = i;
    }
  }
  uni.navigateTo({
    url: "/mine/liaotianyemian/liaotianyemian?Id=" + i + "&key=" + messageKey,
  });
};
// 投递简历
const sendResume = () => {
  popup.value.show();
};
const send = () => {
  postUserInfosP0DeliveryRecords(store.account.fullInformationId, {
    positionInformationId: positionId.value,
    userInformationId: store.account.fullInformationId,
    companyInformationId: companyId.value,
  })
    .then(() => {
      uni.showToast({
        title: "投递成功",
        icon: "none",
        duration: 1500,
      });
    })
    .catch(failResponseHandler);
  popup.value.hide();
};

const viewResume = () => {
  uni.navigateTo({ url: "/info/viewresume/viewresume" });
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: 1400rpx;
  margin-left: 20rpx;
  overflow-y: auto;

  image {
    width: 35rpx;
    height: 35rpx;
  }

  .job-information {
    .name-salary {
      margin-top: 30rpx;

      .name {
        width: 500rpx;
        padding-left: 10rpx;
        font-size: 40rpx;
        font-weight: 600;
      }

      .salary {
        width: 200rpx;
        font-size: 30rpx;
        color: rgb(84 188 163);
      }
    }

    .area-require {
      margin-top: 15rpx;
      font-size: 25rpx;
    }
  }

  .company-info {
    margin-top: 30rpx;

    .logo {
      width: 100rpx;
      height: 100rpx;
    }

    .com-infos {
      padding-left: 20rpx;

      .com-name {
        font-size: 30rpx;
      }

      .com-info {
        margin-top: 10rpx;
        font-size: 25rpx;
        color: rgb(150 150 150);
      }
    }
  }

  .hr-info {
    margin-top: 30rpx;
    font-size: 25rpx;

    .hr {
      width: 60rpx;
      height: 60rpx;
      border-radius: 100%;
    }
  }

  .job-description {
    margin-top: 30rpx;

    .description {
      font-size: 25rpx;
      line-height: 50rpx;
      color: rgb(176 176 176);
    }
  }
}

.btn-box {
  position: fixed;
  bottom: 0;
  z-index: 999;
  width: 100%;
  height: 100rpx;
  background-color: #fff;

  .image-collection {
    width: 60rpx;
    height: 60rpx;
  }

  .btn-common {
    width: 35%;
    height: 70rpx;
    margin: 0rpx;
    font-size: 30rpx;
    color: rgb(35 193 158);
    background-color: rgb(230 230 220);
    border-radius: 10rpx;
  }

  .btn-send-resume {
    width: 45%;
    height: 70rpx;
    margin: 0rpx;
    font-size: 30rpx;
    color: #fff;
    background-color: rgb(35 193 158);
    border-radius: 10rpx;
  }
}

.send-resume-box {
  width: 100%;
  height: 100%;

  .resume-box {
    width: 100%;
    margin-top: 15rpx;
    font-size: 30rpx;
    font-weight: bold;

    .resume {
      width: 95%;
      height: 150rpx;
      margin-left: 2.5%;
      font-size: 25rpx;
      border: 1rpx solid rgb(230 230 230);
      border-radius: 10rpx;
    }
  }

  .send-box {
    width: 95%;
    height: 60rpx;
    margin-top: 15rpx;
    font-size: 30rpx;
    color: #fff;
    background-color: rgb(35 193 158);
    border-radius: 10rpx;
  }
}
</style>
