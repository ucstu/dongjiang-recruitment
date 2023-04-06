<template>
  <NavigationBar title="关注公司" />
  <view class="flex-col page">
    <view class="flex-col list">
      <CompanyPanel
        v-for="(attentionCompany, i) in attentionCompanies"
        :key="i"
        class="list-item"
        :attention-company="attentionCompany"
        :send-type="unfocus"
        @unfocus="unsubscribe(attentionCompany.id)"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import CompanyPanel from "@/components/CompanyPanel/CompanyPanel.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type {
AttentionRecord,
Company,
} from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const attentionCompanies = ref<Company[]>([]);
const focusCompany = ref<AttentionRecord[]>([]);
const unfocus = ref("取消关注");
const emptyShow = ref(true);

until(
  computed(() => !!mainStore.applicant?.id),
  () => {
    // 查询关注公司记录
    applicantAttentionRecordService
      .queryAttentionRecord({
        applicantId: mainStore.applicant!.id,
      })
      .then((res) => {
        focusCompany.value = res.items;
        for (const focus of focusCompany.value) {
          companyService
            .getCompany({
              id: focus.company.id,
            })
            .then((res) => {
              attentionCompanies.value.push(res);
              if (attentionCompanies.value.length) {
                emptyShow.value = false;
              }
            });
        }
      });
  }
);

onShow(() => {
  if (!attentionCompanies.value.length) {
    attentionCompanies.value = [];
    emptyShow.value = true;
  }
});
// 删除关注记录
const unsubscribe = (id: string) => {
  const attentionRecordId = focusCompany.value.find((item) => {
    return item.company.id === id;
  });
  applicantAttentionRecordService
    .removeAttentionRecord({
      applicantId: attentionRecordId!.applicant.id,
      id: attentionRecordId!.id,
    })
    .then((res) => {
      attentionCompanies.value = attentionCompanies.value.filter((item) => {
        return item.id !== id;
      });
    });
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .list {
    width: 690rpx;
    margin-left: 30rpx;

    .list-item {
      &:last-of-type {
        margin-top: 18rpx;
      }
    }
  }
}

.image {
  width: 100%;
  height: auto;
  margin: 10rpx 0 7rpx 7rpx;
}
</style>
