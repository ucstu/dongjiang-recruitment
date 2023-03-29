<template>
  <SearchBar :city="cityName" :search-content="searchContent"></SearchBar>
  <view class="justify-between about">
    <text
      class="justify-center text-title"
      :class="position ? 'active' : ''"
      @click="checkPosition"
      >职位</text
    >
    <text
      class="justify-center text-title"
      :class="company ? 'active' : ''"
      @click="checkCompany"
      >公司</text
    >
  </view>
  <FilterBar
    v-if="position && searchContent"
    :search-content="searchContent"
  ></FilterBar>
  <SearchAndFilter
    v-if="company && searchContent"
    :search-content="searchContent"
  ></SearchAndFilter>
</template>

<script lang="ts" setup>
import FilterBar from "@/components/SearchAndFilter/FilterBar.vue";
import SearchAndFilter from "@/components/SearchAndFilter/SearchAndFilter.vue";
import SearchBar from "@/components/SearchAndFilter/SearchBar.vue";

const position = ref(true);
const company = ref(false);
const cityName = ref("");
const searchContent = ref("");

// 加载页面时调用的函数。
onLoad((e) => {
  if (e!.city) {
    cityName.value = e!.city;
  }
  if (e!.searchContent) {
    searchContent.value = e!.searchContent;
  }
});

/**查看相关职位 */
const checkPosition = () => {
  position.value = true;
  company.value = false;
};

/**查看相关公司 */
const checkCompany = () => {
  company.value = true;
  position.value = false;
};
</script>

<style lang="scss" scoped>
.active {
  color: rgb(35 193 158);
}

.about {
  width: 70%;
  margin-bottom: 5rpx;
  margin-left: 15%;
  font-size: 30rpx;
  line-height: 28rpx;
  letter-spacing: 6rpx;
  white-space: nowrap;

  .text-title {
    width: 50%;
  }
}

.page {
  position: relative;
  width: 710rpx;
  height: 1334rpx;
  margin-left: 20rpx;
  overflow-y: auto;
  background-color: rgb(255 255 255);

  .list {
    width: 690rpx;
    margin-top: 30rpx;
    margin-left: 10rpx;
  }
}

.image {
  width: 100%;
  height: 100%;
}
</style>
