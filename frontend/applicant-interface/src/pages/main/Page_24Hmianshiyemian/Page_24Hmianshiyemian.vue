<template>
  <view class="flex-col items-center justify-center page">
    <z-paging
      ref="paging"
      v-model="positions"
      use-page-scroll
      :default-page-size="5"
      @query="queryList"
    >
      <view
        v-for="advertisement in positions"
        :key="advertisement.id"
        :advertisement="advertisement"
      >
        <image style="width: 100%" :src="useResFullPath(advertisement.banner)" />
      </view>
    </z-paging>
  </view>
</template>

<script lang="ts" setup>
import { useResFullPath } from "@/hooks";
import type { Advertise } from "@dongjiang-recruitment/service-common";
import dayjs from "dayjs";

const positions = ref<Array<Advertise>>([]);
const paging = ref<{ complete: (param: Array<any> | boolean) => void }>();
const queryList = async (pageNo: number, pageSize: number) => {
  paging.value?.complete(
    (
      await advertiserService.queryAllAdvertise({
        query: {
          position: ["$eq", 1],
          startTime: ["$lte", dayjs().format("YYYY-MM-DD HH:mm:ss")],
          endTime: ["$gte", dayjs().format("YYYY-MM-DD HH:mm:ss")],
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
