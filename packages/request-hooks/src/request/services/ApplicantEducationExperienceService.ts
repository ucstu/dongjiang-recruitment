/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EducationExperience } from "../models/EducationExperience";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class ApplicantEducationExperienceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加教育经历
   * 增加教育经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addEducationExperience({
    userInfoId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    requestBody?: {
      /**
       * 学校名称
       */
      schoolName: string;
      /**
       * {1:大专,2:本科,3:硕士,4:博士}
       */
      education: 0 | 1 | 2 | 3 | 4;
      /**
       * 专业名称
       */
      majorName: string;
      /**
       * 入学时间
       */
      admissionTime: string;
      /**
       * 毕业时间
       */
      graduationTime: string;
    };
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 响应状态
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 教育经历
     */
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/eduExperiences",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有教育经历
   * 查询所有教育经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllEducationExperience({
    userInfoId,
    page,
    size,
    sort,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["createdAt,desc"]
     */
    sort?: Array<`${keyof EducationExperience},${"asc" | "desc"}`>;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 响应状态
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 响应结果
     */
    body: {
      /**
       * 记录总数
       */
      totalCount: number;
      /**
       * 教育经历列表
       */
      educationExperiences: Array<EducationExperience>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/eduExperiences",
      path: {
        userInfoId: userInfoId,
      },
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除教育经历
   * 删除教育经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteEducationExperience({
    userInfoId,
    eduExperienceId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 教育经历ID
     */
    eduExperienceId: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 响应状态
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 教育经历
     */
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/eduExperiences/{eduExperienceId}",
      path: {
        userInfoId: userInfoId,
        eduExperienceId: eduExperienceId,
      },
    });
  }

  /**
   * 查询教育经历
   * 查询教育经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getEducationExperience({
    userInfoId,
    eduExperienceId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 教育经历ID
     */
    eduExperienceId: string;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 响应状态
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 教育经历
     */
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/eduExperiences/{eduExperienceId}",
      path: {
        userInfoId: userInfoId,
        eduExperienceId: eduExperienceId,
      },
    });
  }

  /**
   * 修改教育经历
   * 修改教育经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateEducationExperience({
    userInfoId,
    eduExperienceId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 教育经历ID
     */
    eduExperienceId: string;
    requestBody?: EducationExperience;
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp: string;
    /**
     * 响应状态
     */
    status: number;
    /**
     * 状态描述
     */
    message: string;
    /**
     * 教育经历
     */
    body: EducationExperience;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/eduExperiences/{eduExperienceId}",
      path: {
        userInfoId: userInfoId,
        eduExperienceId: eduExperienceId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
