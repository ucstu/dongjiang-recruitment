<template>
  <NavigationBar title="在线简历" right="预览" @right-click="viewResume" />
  <view class="flex-col page">
    <view class="flex-col group-all">
      <view class="flex-col group-user">
        <view class="flex-row justify-between user-box">
          <view class="flex-col" @click="changeInfo">
            <view class="flex-row items-center user">
              <text class="text-top" style="font-size: 40rpx; font-weight: 600"
                >{{ store.applicantInformation.firstName
                }}{{ store.applicantInformation.lastName }}</text
              >
              <image class="image" src="@/static/icons/edit.png" />
            </view>
            <view>
              <text style="font-size: 30rpx"
                >{{ workYear[store.applicantInformation.workingYears] }}/{{
                  store.applicantInformation.age
                }}岁/{{ education[store.applicantInformation.education] }}</text
              >
            </view>
          </view>
          <view class="image-box">
            <image
              :src="VITE_CDN_URL + store.applicantInformation.avatarUrl"
              class="photo"
            />
            <image
              v-if="store.applicantInformation.sex === '男'"
              class="sex-image"
              src="@/static/icons/man.png"
            />
            <image
              v-if="store.applicantInformation.sex === '女'"
              class="sex-image"
              src="@/static/icons/woman.png"
            />
          </view>
        </view>
        <view class="flex-col except-work-box">
          <view class="flex-col except-work">
            <text class="text-top">求职期望</text>
          </view>
          <view
            v-for="(jobExcept, i) in store.jobExpectations"
            :key="i"
            class="flex-col"
            style="margin-top: 20rpx"
            @click="ToJobExpectation"
          >
            <view style="font-size: 28rpx; font-weight: 600">
              <text>{{ jobExcept.positionName }}</text>
              <text style="padding-left: 20rpx">
                {{ jobExcept.startingSalary }}k-{{
                  jobExcept.ceilingSalary
                }}k</text
              ></view
            >
            <view>
              <text
                v-for="(directionTag, i) in jobExcept.directionTags"
                :key="i"
                style="margin-right: 20rpx; font-size: 25rpx"
                >{{ directionTag }}</text
              >
            </view>
            <view style="font-size: 25rpx">
              <text>{{ jobExcept.cityName }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="group-box">
        <view class="flex-row items-center justify-between group-info-box">
          <text class="text-top">个人优势</text>
          <image
            class="image"
            src="@/static/icons/edit.png"
            @click="addAdvantage"
          />
        </view>
        <view class="advantage-box">
          <text style="white-space: nowrap">{{
            store.applicantInformation.personalAdvantage
          }}</text>
        </view>
      </view>
      <view class="group-box">
        <view class="flex-row items-center justify-between group-info-box">
          <text class="text-top">工作经历</text>
          <image
            class="image"
            src="@/static/icons/plus-circle.svg"
            @click="addWork"
          />
        </view>
        <view
          v-for="(workExperience, i) in workExperiences"
          :key="i"
          class="flex-col experience-box"
          @click="alterWork(i)"
        >
          <text class="experience-company">{{
            workExperience.corporateName
          }}</text>
          <text>{{ workExperience.positionName }}</text>
          <text
            >{{ workExperience.startTime }}~{{ workExperience.endTime }}</text
          >
          <text class="experience-work">{{ workExperience.jobContent }}</text>
        </view>
      </view>
      <view class="group-box">
        <view class="flex-row items-center justify-between group-info-box">
          <text class="text-top">教育经历</text>
          <image
            class="image"
            src="@/static/icons/plus-circle.svg"
            @click="addEducate"
          />
        </view>
        <view
          v-for="(educate, i) in educationExperiences"
          :key="i"
          class="flex-col educate-box"
          @click="alterEducate(i)"
        >
          <text class="educate-school">{{ educate.schoolName }}</text>
          <text>{{ educate.majorName }}</text>
          <view>
            <text>{{ education[educate.education] }}</text
            >&nbsp;&nbsp;
            <text
              >{{ educate.admissionTime }}-{{ educate.graduationTime }}</text
            >
          </view>
        </view>
      </view>
      <view class="group-box">
        <view class="flex-row items-center justify-between group-info-box">
          <text class="text-top">项目经历</text>
          <image
            class="image"
            src="@/static/icons/plus-circle.svg"
            @click="addProject"
          />
        </view>
        <view
          v-for="(project, i) in projectExperiences"
          :key="i"
          class="flex-col project-box"
          @click="alterProject(i)"
        >
          <text class="project-pro">{{ project.projectName }}</text>
          <text>{{ project.startTime }}-{{ project.endTime }}</text>
          <text class="project-description">{{
            project.projectDescription
          }}</text>
        </view>
      </view>
    </view>
  </view>
</template>

<script lang="ts" setup>
import NavigationBar from "@/components/NavigationBar/NavigationBar.vue";
import {
getUserInfosP0EduExperiences,
getUserInfosP0ProjectExperiences,
getUserInfosP0WorkExperiences
} from "@/services/services";
import {
EducationExperience,
ProjectExperience,
WorkExperience
} from "@/services/types";
import { useAuthStore } from "@/stores/auth";
import { failResponseHandler } from "@/utils/handler";

const VITE_CDN_URL = import.meta.env.VITE_CDN_URL;
const store = useAuthStore();

const education = ref(["未知", "大专", "本科", "硕士", "博士"]);
const workYear = [
  "",
  "无工作经验",
  "在校/应届",
  "3年及以下",
  "3-5年",
  "5-10年",
  "10年以上",
];

// 工作经历
const workExperiences = ref<WorkExperience[]>([]);
// 教育经历
const educationExperiences = ref<EducationExperience[]>([]);
// 项目经历
const projectExperiences = ref<ProjectExperience[]>([]);

onShow(() => {
  // 查询所有工作经历
  getUserInfosP0WorkExperiences(store.accountInformation.fullInformationId, {})
    .then((res) => {
      workExperiences.value = res.data.body.workExperiences;
    })
    .catch(failResponseHandler);
  // 查询所有教育经历
  getUserInfosP0EduExperiences(store.accountInformation.fullInformationId, {})
    .then((res) => {
      if (res.data.body.educationExperiences.length > 0) {
        educationExperiences.value = res.data.body.educationExperiences;
        store.applicantInformation.education =
          educationExperiences.value[0].education;
        for (let i = 0; i <= educationExperiences.value.length; i++) {
          if (
            store.applicantInformation.education <
            educationExperiences.value[i].education
          ) {
            store.applicantInformation.education =
              educationExperiences.value[i].education;
          }
        }
      } else {
        store.applicantInformation.education = 0;
      }
    })
    .catch(failResponseHandler);
  // 查询所有项目经历
  getUserInfosP0ProjectExperiences(
    store.accountInformation.fullInformationId,
    {}
  )
    .then((res) => {
      projectExperiences.value = res.data.body.projectExperiences;
    })
    .catch(failResponseHandler);
});

// 修改个人信息
const changeInfo = () => {
  uni.navigateTo({ url: "/info/gerenxinxi/gerenxinxi" });
};
// 查看求职期望
const ToJobExpectation = () => {
  uni.navigateTo({ url: "/info/qiuzhiyixiang/qiuzhiyixiang" });
};
// 添加个人优势
const addAdvantage = () => {
  uni.navigateTo({ url: "/info/gerenyoushi/gerenyoushi" });
};
// 添加工作经历
const addWork = () => {
  uni.navigateTo({ url: "/info/gongzuojingli/gongzuojingli" });
};
// 添加教育经历
const addEducate = () => {
  uni.navigateTo({ url: "/info/jiaoyujingli/jiaoyujingli" });
};
// 添加项目经历
const addProject = () => {
  uni.navigateTo({ url: "/info/xiangmujingli/xiangmujingli" });
};

// 查看、修改、删除工作经历
const alterWork = (index: number) => {
  const workId = workExperiences.value[index].workExperienceId;
  const deleteWork = ref("删除");
  uni.navigateTo({
    url:
      "/info/gongzuojingli/gongzuojingli?workId=" +
      workId +
      "&deleteWork=" +
      deleteWork.value,
  });
};

// 查看、修改、删除教育经历
const alterEducate = (index: number) => {
  const educateId = educationExperiences.value[index].educationExperienceId;
  const deleteEducate = ref("删除");
  uni.navigateTo({
    url:
      "/info/jiaoyujingli/jiaoyujingli?educateId=" +
      educateId +
      "&deleteEducate=" +
      deleteEducate.value,
  });
};

// 查看、修改、删除项目经历
const alterProject = (index: number) => {
  const projectId = projectExperiences.value[index].projectExperienceId;
  const deleteProject = ref("删除");
  uni.navigateTo({
    url:
      "/info/xiangmujingli/xiangmujingli?projectId=" +
      projectId +
      "&deleteProject=" +
      deleteProject.value,
  });
};

const viewResume = () => {
  uni.navigateTo({ url: "/info/viewresume/viewresume" });
};
</script>

<style lang="scss" scoped>
.page {
  .image {
    width: 50rpx;
    height: 50rpx;
  }

  .group-all {
    width: 710rpx;
    height: auto;
    margin-left: 20rpx;

    .group-user {
      height: auto;
      line-height: 35rpx;
      border-bottom: 1px solid rgb(230 230 230);

      .user-box {
        height: 120rpx;
      }

      .image-box {
        .image {
          width: 50rpx;
          height: 50rpx;
        }

        .sex-image {
          position: absolute;
          top: 220rpx;
          right: 30rpx;
          width: 25rpx;
          height: 25rpx;
        }
      }

      .except-work-box {
        height: auto;

        .except-work {
          height: 80rpx;
        }
      }
    }

    .group-box {
      height: auto;
      border-bottom: 1px solid rgb(230 230 230);

      .group-info-box {
        height: 100rpx;
      }

      .advantage-box {
        width: 100%;
        max-height: 80rpx;
        overflow: hidden;
        font-size: 30rpx;
        line-height: 40rpx;
        text-overflow: ellipsis;
      }

      .experience-box {
        height: auto;
        margin-top: 20rpx;
        font-size: 25rpx;
        line-height: 40rpx;

        .experience-company {
          font-size: 30rpx;
          font-weight: bold;
        }

        .experience-work {
          max-height: 40rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }

      .educate-box {
        height: auto;
        margin-top: 20rpx;
        font-size: 25rpx;
        line-height: 40rpx;

        .educate-school {
          font-size: 30rpx;
          font-weight: bold;
        }
      }

      .project-box {
        height: auto;
        margin-top: 20rpx;
        font-size: 25rpx;
        line-height: 40rpx;

        .project-pro {
          font-size: 30rpx;
          font-weight: bold;
        }

        .project-description {
          max-height: 40rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }

  .text-top {
    font-size: 35rpx;
    font-weight: 600;
  }

  .photo {
    width: 120rpx;
    height: 120rpx;
    border-radius: 100%;
  }
}
</style>
