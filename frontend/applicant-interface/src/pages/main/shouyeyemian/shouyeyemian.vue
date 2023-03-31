<template>
  <view class="flex-col page">
    <!--  #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
    <view
      class="section-1"
      :style="'height: ' + navigationBarTop + 'px'"
    ></view>
    <view class="flex-col section-2" style="padding: 0 20rpx 20rpx">
      <view
        class="justify-between items-center"
        :style="
          'height: ' +
          navigationBarHeight +
          'px; width: ' +
          navigationBarWidth +
          'px'
        "
      >
        <scroll-view
          :scroll-x="true"
          :style="'width: ' + expectationWidth + 'px'"
          class="flex-row list"
        >
          <text
            v-for="jobExpectation in mainStore.jobExpectations?.items || []"
            :key="jobExpectation.id"
            class="list-item"
            :class="activeJobExpectation === jobExpectation ? 'active' : ''"
            @click="activeJobExpectation = jobExpectation"
          >
            {{ jobExpectation.positionName }}
          </text>
        </scroll-view>
        <view class="flex-row">
          <image
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254586402738.png"
            class="image"
            @click="image_5OnClick"
          />
          <image
            src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254587111646.png"
            class="image image-2"
            @click="image_6OnClick"
          />
        </view>
      </view>
      <view class="justify-between group-2">
        <view class="flex-row group-3">
          <text
            v-for="(method, index) in methods"
            :key="index"
            style="margin-right: 20rpx"
            :class="activeMethod === method ? 'is-active' : ''"
            @click="activeMethod = method"
            >{{ method }}</text
          >
        </view>
        <view class="flex-row group-4">
          <view class="flex-row">
            <text @click="text_22OnClick">{{ jobFilter.workCityName }}</text>
            <image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
              class="image-3 image-4"
            />
          </view>
          <view class="flex-row group-6">
            <text @click="text_23OnClick">筛选</text>
            <image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
              class="image-3 image-5"
            />
          </view>
        </view>
      </view>
      <image
        src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254587777410.png"
        class="image-6"
      />
    </view>
    <!--  #endif -->
    <!--  #ifndef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ -->
    <view class="section-1"></view>
    <view class="flex-col section-2" style="padding: 0 10rpx 20rpx">
      <view style="width: 92%; height: auto; margin-left: 4%">
        <view class="justify-between items-center">
          <scroll-view :scroll-x="true" class="flex-row list">
            <text
              v-for="jobExpectation in mainStore.jobExpectations?.items || []"
              :key="jobExpectation.id"
              class="list-item"
              :class="activeJobExpectation === jobExpectation ? 'active' : ''"
              @click="activeJobExpectation = jobExpectation"
            >
              {{ jobExpectation.positionName }}
            </text>
          </scroll-view>
          <view class="flex-row">
            <image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254586402738.png"
              class="image"
              @click="image_5OnClick"
            />
            <image
              src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254587111646.png"
              class="image image-2"
              @click="image_6OnClick"
            />
          </view>
        </view>
        <view class="justify-between group-2">
          <view class="flex-row group-3">
            <text
              v-for="(method, index) in methods"
              :key="index"
              style="margin-right: 20rpx"
              :class="activeMethod === method ? 'is-active' : ''"
              @click="activeMethod = method"
            >
              {{ method }}
            </text>
          </view>
          <view class="flex-row group-4">
            <view class="flex-row">
              <text @click="text_22OnClick">{{ jobFilter.workCityName }}</text>
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
                class="image-3 image-4"
              />
            </view>
            <view class="flex-row group-6">
              <text @click="text_23OnClick">筛选</text>
              <image
                src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475959311313713900.png"
                class="image-3 image-5"
              />
            </view>
          </view>
        </view>
        <image
          src="https://codefun-proj-user-res-1256085488.cos.ap-guangzhou.myqcloud.com/623287845a7e3f0310c3a3f7/623446dc62a7d90011023514/16475932254587777410.png"
          class="image-6"
        />
      </view>
    </view>
    <!--  #endif -->
    <view class="flex-col">
      <z-paging
        ref="paging"
        v-model="positions"
        use-page-scroll
        :default-page-size="5"
        @query="queryList"
      >
        <job-detail
          v-for="position in positions"
          :key="position.id"
          :position="position"
          @job-click="jobDescription(position)"
        />
      </z-paging>
    </view>
  </view>
</template>

<script lang="ts" setup>
import { useMainStore } from "@/stores";
import type {
  JobExpectation,
  Position,
} from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

/* #ifdef MP-WEIXIN || MP-ALIPAY || MP-BAIDU || MP-TOUTIAO || MP-QQ */
const navigationBarHeight = mainStore.menu.height;
const navigationBarTop = mainStore.menu.top;
const navigationBarWidth = mainStore.menu.left - uni.upx2px(30);
const expectationWidth = mainStore.menu.left - uni.upx2px(170);
/* #endif */

interface Filter {
  /**
   * 职位类型
   */
  positionType: string;
  /**
   * 工作年限，eg；{1:NoExperience,2:InSchoolOrFreshGraduate,3:Under3Year,4:With3To5Year,5:With5To10Year,6:MoreThen10Year}
   */
  workingYears: Position.workingYears;
  /**
   * 学历要求，eg；{0:Unlimited,1:JuniorCollege,2:Undergraduate,3:Postgraduate,4:Doctor}
   */
  education: Position.education;
  /**
   * 细分标签
   */
  directionTags: Array<string>;
  /**
   * 单位K
   */
  startingSalary: number;
  /**
   * 单位K
   */
  ceilingSalary: number;
  /**
   * 工作省份
   */
  workProvinceName: string;
  /**
   * 工作城市
   */
  workCityName: string;
  /**
   * 工作地区
   */
  workAreaName: string;
  /**
   * 职位类型，eg；{1:FullTime,2:PartTime,3:Practice}
   */
  workType: Position.workType;
}

const jobFilter = ref<Filter>({} as Filter);
const positions = ref<Array<Position>>([]);
const methods = ref<Array<"热门" | "附近" | "最新">>(["热门", "附近", "最新"]);
const activeMethod = ref<"热门" | "附近" | "最新">(methods.value[0]);
const activeJobExpectation = ref<JobExpectation>(
  mainStore.jobExpectations?.items[0]!
);
const paging = ref<{ complete: (param: Array<any> | boolean) => void }>();
const queryList = async (pageNo: number, pageSize: number) => {
  paging.value?.complete(
    (
      await companyService.queryAllPosition({
        page: pageNo,
        size: pageSize,
        sort: activeMethod.value === "最新" ? ["createdAt,desc"] : undefined,
      })
    ).items
  );
};

/** 添加求职期望 */
const image_5OnClick = () => {
  uni.navigateTo({ url: "/pages/info/qiuzhiqiwang/qiuzhiqiwang?data=2" });
};
/**
 * 搜索跳转
 */
const image_6OnClick = () => {
  uni.navigateTo({
    url: `/pages/most/sousuoyemian/sousuoyemian?city=${jobFilter.value}`,
  });
};
/* 位置选择 */
const text_22OnClick = () => {
  uni.navigateTo({
    url:
      `/pages/most/weizhixuanze/weizhixuanze?city=` +
      jobFilter.value +
      "&areas=",
    // JSON.stringify(city.value),
  });
};
const text_23OnClick = () => {
  uni.navigateTo({
    url: "/pages/most/shaixuanyemian/shaixuanyemian?filter=",
    // JSON.stringify(filters.value),
  });
};
/* 查看职位详情 */
const jobDescription = ({ companyId, id }: Position) => {
  uni.navigateTo({
    url: `/pages/detail/zhiweixiangqing/zhiweixiangqing?companyId=${companyId}&positionId=${id}`,
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: 100%;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .section-1 {
    height: 45rpx;
    background-color: rgb(37 85 212);
  }

  .section-2 {
    width: 100%;
    height: auto;
    background-color: rgb(37 85 212);

    .group-2 {
      margin-top: 15rpx;

      .group-3 {
        font-size: 25rpx;
        line-height: 23rpx;
        color: rgb(209 205 205);
        white-space: nowrap;

        .is-active {
          color: rgb(255 255 255);
        }

        .text-4 {
          margin-left: 32rpx;
        }

        .text-5 {
          margin-left: 29rpx;
        }
      }

      .group-4 {
        margin-top: 5rpx;
        font-size: 20rpx;
        line-height: 17rpx;
        color: rgb(255 255 255);
        white-space: nowrap;

        .group-6 {
          margin-left: 27rpx;

          .image-5 {
            margin: 6rpx 0 5rpx 3rpx;
          }
        }

        .image-4 {
          margin: 7rpx 0 4rpx 3rpx;
        }

        .image-3 {
          width: 10rpx;
          height: 7rpx;
        }
      }
    }

    .image-6 {
      width: 100%;
      height: 200rpx;
      margin-top: 26rpx;
      border-radius: 25rpx;
    }

    .list {
      margin: 3rpx 0 9rpx;
      overflow: hidden;
      white-space: nowrap;

      .active {
        font-size: 35rpx !important;
        color: rgb(255 255 255) !important;
      }

      .list-item {
        margin-right: 12rpx;
        font-size: 28rpx;
        line-height: 32rpx;
        color: rgb(209 205 205);
        white-space: nowrap;
      }
    }

    .image {
      width: 45rpx;
      height: 44rpx;
    }

    .image-2 {
      margin-left: 30rpx;
    }
  }

  .footer {
    height: 101rpx;
    padding: 9rpx 49rpx 11rpx 56rpx;
    margin-top: 61rpx;
    overflow: hidden;
    border: solid 2rpx rgb(0 0 0);

    .group-15 {
      width: 79rpx;
      height: 76rpx;
      font-size: 20rpx;
      line-height: 19rpx;
      color: rgb(0 0 0);
      white-space: nowrap;

      .text-52 {
        margin-top: 3rpx;
      }
    }

    .group-16 {
      height: 77rpx;
      font-size: 20rpx;
      line-height: 18rpx;
      color: rgb(0 0 0);
      white-space: nowrap;

      .text-53 {
        margin-top: 4rpx;
      }
    }

    .group-17 {
      width: 79rpx;
      height: 72rpx;
      margin-top: 5rpx;
      font-size: 20rpx;
      line-height: 19rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .group-18 {
      width: 79rpx;
      height: 74rpx;
      margin-top: 3rpx;
      font-size: 20rpx;
      line-height: 19rpx;
      color: rgb(0 0 0);
      white-space: nowrap;
    }

    .image-12 {
      width: 54rpx;
      height: 54rpx;
    }
  }
}
</style>
