<template>
  <NavigationBar title="收藏职位" right="清空" @right-click="emptyFavorites" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobPanel
        v-for="(collectionPosition, i) in favoritesPosition"
        :key="i"
        class="list-item"
        :collection-position="collectionPosition"
        :send-type="cancelCollection"
      />
    </view>
  </view>
  <view v-if="emptyShow" class="justify-center image">
    <image src="@/static/icons/nodata.svg" />
  </view>
</template>

<script lang="ts" setup>
import JobPanel from "@/components/JobPanel/JobPanel.vue";
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import { useMainStore } from "@/stores";
import type {
  GarnerRecord,
  Position,
} from "@dongjiang-recruitment/service-common";

const store = useMainStore();

const favorites = ref<GarnerRecord[]>([]);
const favoritesPosition = ref<Position[]>([]);
const cancelCollection = ref("取消收藏");
const emptyShow = ref(true);

// 查询收藏记录
applicantGarnerRecordService
  .queryGarnerRecord({
    applicantId: store.applicant!.id,
  })
  .then((res) => {
    favorites.value = res.items;
    for (const favorite of favorites.value) {
      companyPositionService
        .getPosition({
          companyId: favorite.companyId,
          id: favorite.positionId,
        })
        .then((res) => {
          favoritesPosition.value.push(res);
          if (favoritesPosition.value.length) {
            emptyShow.value = false;
          }
        });
    }
  });

onShow(() => {
  if (!favoritesPosition.value.length) {
    favoritesPosition.value = [];
    emptyShow.value = true;
  }
});

/* 清空收藏记录 */
const emptyFavorites = () => {
  for (const favorite of favorites.value) {
    applicantGarnerRecordService
      .removeGarnerRecord({
        applicantId: favorite.applicantId,
        id: favorite.id,
      })
      .then(() => {
        favorites.value = [];
        favoritesPosition.value.length = 0;
      });
  }
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
