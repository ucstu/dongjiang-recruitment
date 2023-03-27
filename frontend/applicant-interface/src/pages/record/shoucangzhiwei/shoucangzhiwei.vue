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
import {
deleteUserInfosP0GarnerRecordsP1,
getCompanyInfosP0PositionInfosP1,
getUserInfosP0GarnerRecords
} from "@/services/services";
import { PositionInformation } from "@/services/types";
import { useAuthStore } from "@/stores/auth";
import { failResponseHandler } from "@/utils/handler";
const store = useAuthStore();

const favorites = ref();
const favoritesPosition = ref<PositionInformation[]>([]);
const cancelCollection = ref("取消收藏");
const emptyShow = ref(true);
// 查询收藏记录
getUserInfosP0GarnerRecords(store.account.fullInformationId, {})
  .then((res) => {
    favorites.value = res.data.body.garnerRecords;
    for (const favorite of favorites.value) {
      getCompanyInfosP0PositionInfosP1(
        favorite.companyInformationId,
        favorite.positionInformationId
      )
        .then((res) => {
          favoritesPosition.value.push(res.data.body);
          if (favoritesPosition.value.length) {
            emptyShow.value = false;
          }
        })
        .catch(failResponseHandler);
    }
  })
  .catch(failResponseHandler);

onShow(() => {
  if (!favoritesPosition.value.length) {
    favoritesPosition.value = [];
    emptyShow.value = true;
  }
});

/* 清空收藏记录 */
const emptyFavorites = () => {
  for (const favorite of favorites.value) {
    deleteUserInfosP0GarnerRecordsP1(
      favorite.userInformationId,
      favorite.garnerRecordId
    )
      .then(() => {
        favorites.value = null;
        favoritesPosition.value.length = 0;
      })
      .catch(failResponseHandler);
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
