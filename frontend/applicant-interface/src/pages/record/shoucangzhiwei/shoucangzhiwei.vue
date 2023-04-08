<template>
  <NavigationBar title="收藏职位" right="清空" @right-click="emptyFavorites" />
  <view class="flex-col page">
    <view class="flex-col list">
      <JobPanel
        v-for="(collectionPosition, i) in favoritesPosition"
        :key="i"
        class="list-item1"
        :collection-position="collectionPosition"
        :send-type="cancelCollection"
        @state-click="stateClick(collectionPosition.id)"
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
import { until } from "@/hooks";
import { useMainStore } from "@/stores";
import type {
GarnerRecord,
Position,
} from "@dongjiang-recruitment/service-common";

const mainStore = useMainStore();

const favorites = ref<GarnerRecord[]>([]);
const favoritesPosition = ref<Position[]>([]);
const cancelCollection = ref("取消收藏");
const emptyShow = ref(true);

until(
  computed(() => !!mainStore.applicant?.id),
  () => {
    // 查询收藏记录
    applicantGarnerRecordService
      .queryGarnerRecord({
        applicantId: mainStore.applicant!.id,
      })
      .then((res) => {
        favorites.value = res.items;
        for (const favorite of favorites.value) {
          companyPositionService
            .getPosition({
              companyId: favorite.company.id,
              id: favorite.position.id,
            })
            .then((res) => {
              favoritesPosition.value.push(res);
              if (favoritesPosition.value.length) {
                emptyShow.value = false;
              }
            });
        }
      });
  }
);

onShow(() => {
  if (!favoritesPosition.value.length) {
    favoritesPosition.value = [];
    emptyShow.value = true;
  }
});

const stateClick = (id: string) => {
  const favoriteId = favorites.value.find((item) => {
    return item.position.id === id
  });
  applicantGarnerRecordService.removeGarnerRecord({
    applicantId: favoriteId!.applicant.id,
      id: favoriteId!.id,
  }).then((res) => {
    favoritesPosition.value = favoritesPosition.value.filter((item) => {
      return item.id != id
    })
  })
}

/* 清空收藏记录 */
const emptyFavorites = () => {
  for (const favorite of favorites.value) {
    applicantGarnerRecordService
      .removeGarnerRecord({
        applicantId: favorite.applicant.id,
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

    .list-item1 {
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
