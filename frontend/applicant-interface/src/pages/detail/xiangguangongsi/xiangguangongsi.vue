<template>
  <SearchAndFilter></SearchAndFilter>
  <view class="page">
    <view class="flex-col list">
      <CompanyDetail
        v-for="(attentionCompany, i) in attentionCompanies"
        :key="i"
        class="list-item"
        :company-detail="attentionCompany"
        @click="toCompanyInfo"
      />
    </view>
  </view>
</template>

<script lang="ts" setup>
import CompanyDetail from "@/components/CompanyDetail/CompanyDetail.vue";
import SearchAndFilter from "@/components/SearchAndFilter/SearchAndFilter.vue";
import { getCompanyInfos, getFilterInformation } from "@/services/services";
import { CompanyInformation } from "@/services/types";
import { failResponseHandler } from "@/utils/handler";

const popup = ref();

const attentionCompanies = reactive<CompanyInformation[]>([]);
getCompanyInfos({})
  .then((res) => {
    attentionCompanies.push(...res.data.body.companyInformations);
  })
  .catch(failResponseHandler);
const companySizes = reactive<string[]>([]); //公司规模
const financeStages = reactive<string[]>([]); //融资阶段
const industrySectors = reactive<string[]>([]); //行业领域
getFilterInformation().then((res) => {
  companySizes.push(...res.data.body.companySize);
  financeStages.push(...res.data.body.financingStage);
  industrySectors.push(...res.data.body.industryField);
});

const toCompanyInfo = () => {
  uni.navigateTo({ url: "/detail/gongsijieshao/gongsijieshao" });
};
</script>

<style lang="scss" scoped>
.page {
  position: relative;
  width: 710rpx;
  height: 1330rpx;
  margin-left: 20rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .search-sort {
    width: 710rpx;
    height: 80rpx;
    font-size: 28rpx;

    .search {
      width: 355rpx;
    }

    .sort {
      width: 355rpx;
    }
  }

  .list {
    margin-top: 30rpx;

    .list-item {
      &:not(:first-of-type) {
        margin-top: 24rpx;
      }
    }
  }

  .image {
    width: 15rpx;
    height: 15rpx;
    margin-left: 20rpx;
    color: rgb(230 230 230);
  }
}
</style>
