<template>
  <view class="flex-col bar">
    <view class="flex-row equal">
      <view class="items-center justify-center equal-div" @click="sort">
        <text>{{ sortval }}</text>
        <image
          class="image"
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
        />
      </view>
      <view class="items-center justify-center equal-div">
        <text>公司</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
          class="image"
        />
      </view>
      <view class="items-center justify-center equal-div" @click="filter">
        <text>筛选</text>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16478528775248822692.png"
          class="image"
        />
      </view>
    </view>
    <view v-if="jobDetails.length ? false : true" class="justify-center image">
      <image src="@/static/icons/nodata.svg" />
    </view>
    <scroll-view :scroll-y="true" class="job-scroll">
      <JobDetail
        v-for="(JobDetailer, i) in jobDetails"
        :key="i"
        class="list-item"
        :position="JobDetailer"
        @job-click="toPositions(JobDetailer.id, JobDetailer.companyId)"
      />
    </scroll-view>
  </view>
  <wybPopup
    ref="popup"
    :show-close-icon="false"
    :height="400"
    :radius="10"
    mode="size-auto"
    type="bottom"
  >
    <view class="sort-box">
      <view
        v-for="(item, i) in sortValue"
        :key="i"
        class="sort-value"
        :class="sortNum === i ? 'active' : ''"
        @click="sortChoose(i)"
      >
        {{ item }}
      </view>
    </view>
  </wybPopup>
</template>

<script lang="ts" setup>
import JobDetail from "@/components/JobDetail/JobDetail.vue";
import wybPopup from "@/components/wyb-popup/wyb-popup.vue";
import type { Position } from "@dongjiang-recruitment/service-common";

const props = defineProps({
  searchContent: {
    type: String,
    default: "",
  },
});

const jobDetails = ref<Position[]>([]);
const sortValue = ["综合排序", "距离优先", "薪资待遇", "学历要求", "工作经验"];
const sortval = ref(sortValue[0]);

companyService
  .queryAllPosition({
    query: {
      positionType: ["$like", `%${props.searchContent}}%`],
    },
  })
  .then((res) => {
    jobDetails.value = res.items;
  });

// 在“shaixuanyemian”页面中发出的事件“filter”的监听器。
uni.$on("filter", (data) => {
  companyService
    .queryAllPosition({
      query: {
        positionType: ["$like", `%${props.searchContent}`],
        education: ["$in", ...(data.degree || [])],
        workingYears: ["$in", ...(data.degree || [])],
        workType: ["$in", ...(data.degree || [])],
        // scale: ["$in", ...(data.degree || [])],
        // financingStage: ["$in", ...(data.degree || [])],
      },
    })
    .then((res) => {
      jobDetails.value = res.items;
    });
});

// 安装组件后调用的生命周期挂钩。
onMounted(() => {
  uni.$off("filter");
});

// 弹出层
const popup = ref();
const sort = () => {
  popup.value.show();
};
const sortNum = ref(0);

// 选择排序
const sortChoose = (index: number) => {
  sortNum.value = index;
  sortval.value = sortValue[index];
  if (index === 1) {
    // 距离优先
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["workCityName,asc"],
      })
      .then((res) => {
        jobDetails.value = res.items;
      });
  } else if (index === 2) {
    // 薪资待遇
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["startingSalary,asc"],
      })
      .then((res) => {
        jobDetails.value = res.items;
      });
  } else if (index === 3) {
    // 学历要求
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["education,asc"],
      })
      .then((res) => {
        jobDetails.value = res.items;
      });
  } else if (index === 4) {
    // 工作经验
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["workingYears,asc"],
      })
      .then((res) => {
        jobDetails.value = res.items;
      });
  } else {
    // 综合排序
    companyService
      .queryAllPosition({
        query: {
          positionType: ["$like", props.searchContent],
        },
        sort: ["positionName,asc"],
      })
      .then((res) => {
        jobDetails.value = res.items;
      });
  }
  popup.value.hide();
};

// 查看职位详情
const toPositions = (p: string, c: string) => {
  uni.navigateTo({
    url:
      "/detail/zhiweixiangqing/zhiweixiangqing?companyId=" +
      c +
      "&positionId=" +
      p,
  });
};

// 筛选跳转
const filter = () => {
  uni.navigateTo({
    url: "/most/shaixuanyemian/shaixuanyemian",
  });
};
</script>

<style lang="scss" scoped>
.active {
  color: rgb(35 193 158);
}

.bar {
  .equal {
    width: 94%;
    height: 60rpx;
    margin-left: 3%;

    .equal-div {
      width: 130rpx;
      height: 60rpx;
      font-size: 28rpx;
      white-space: nowrap;

      .image {
        width: 10rpx;
        height: 7rpx;
        margin: 10rpx 0 7rpx 7rpx;
      }
    }
  }

  .job-scroll {
    width: 100%;
    height: auto;
    overflow-y: auto;
    background-color: rgb(240 240 240);
  }
}

.sort-box {
  width: 90%;
  height: auto;
  margin-top: 20rpx;
  margin-left: 5%;
  font-size: 35rpx;

  .sort-value {
    width: 100%;
    height: 60rpx;
    border-bottom: 3rpx solid rgb(240 240 240);
  }
}
</style>
