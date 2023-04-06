<template>
  <NavigationBar title="谁看过我" />
  <view class="flex-col page">
    <view class="flex-col list">
      <CompanyDetail
        v-for="(lookForMe, i) in companyInfo"
        :key="i"
        class="list-item"
        :company-detail="lookForMe"
        @com-click="view_2OnClick(lookForMe.id)"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import CompanyDetail from "@/components/CompanyDetail/CompanyDetail.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type { Company } from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const companyInfo = ref<Company[]>([]);
const emptyShow = ref(false);

until(
  computed(() => !!mainStore.applicant?.id),
  () => {
    // 查询查看记录
    personnelService
      .queryAllPersonnelInspectionRecord({
        query: {
          "applicant.id": ["$eq", mainStore.applicant!.id]
        },
      })
      .then((res) => {
        if (res.total === 0) {
          emptyShow.value = true;
        } else {
          for (const item of res.items) {
            personnelService
              .getPersonnel({
                id: item.personnel.id,
              })
              .then((res) => {
                companyService
                  .getCompany({
                    id: res.company.id,
                  })
                  .then((res) => {
                    const p = companyInfo.value.map((item) => item.id);
                    if (!p.includes(res.id)) {
                      companyInfo.value.push(res);
                    }
                  });
              });
          }
          emptyShow.value = false;
        }
      });
  }
);

const view_2OnClick = (c: string) => {
  uni.navigateTo({
    url: "/pages/detail/gongsijieshao/gongsijieshao?companyId=" + c,
  });
};
</script>

<style lang="scss" scoped>
.page {
  width: 710rpx;
  height: auto;

  .list {
    position: absolute;
    top: 128rpx;
    right: 40rpx;
    left: 40rpx;

    .list-item {
      &:not(:first-of-type) {
        margin-top: 24rpx;
      }
    }
  }
}
</style>
