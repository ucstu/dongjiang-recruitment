<template>
  <view class="flex-col items-center justify-center page">
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
</template>

<script lang="ts" setup>
import type { Advertise } from '@dongjiang-recruitment/service-common';


const positions = ref<Array<Advertise>>([]);
const paging = ref<{ complete: (param: Array<any> | boolean) => void }>();
const queryList = async (pageNo: number, pageSize: number) => {
  paging.value?.complete(
    (
      await advertiserService.queryAllAdvertise({
        query: {
          position: ["$eq", 2]
        },
        page: pageNo,
        size: pageSize,
      })
    ).items
  );
};
</script>

<style lang="scss" scoped>
.page {
  width: 100%;
  height: auto;

  .header {
    position: relative;
  }
}
</style>
