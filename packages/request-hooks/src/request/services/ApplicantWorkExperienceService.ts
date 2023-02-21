/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WorkExperience } from "../models/WorkExperience";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantWorkExperienceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加工作经历
   * 增加工作经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addWorkExperience({
    userInfoId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    requestBody?: {
      /**
       * 公司名称
       */
      corporateName: string;
      /**
       * 公司领域
       */
      companyIndustry: string;
      /**
       * 就职时间
       */
      startTime: string;
      /**
       * 离职时间
       */
      endTime: string;
      /**
       * {1:全职,2:兼职,3:实习}
       */
      positionType: 0 | 1 | 2 | 3;
      /**
       * 职位名称
       */
      positionName: string;
      /**
       * 部门名称
       */
      departmentName: string;
      /**
       * 工作内容
       */
      jobContent: string;
    };
  }): CancelablePromise<{
    /**
     * 处理时间
     */
    timestamp?: string;
    /**
     * 响应状态
     */
    status?: number;
    /**
     * 状态描述
     */
    message?: string;
    /**
     * 工作经历
     */
    body?: WorkExperience;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/workExperiences",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有工作经历
   * 查询所有工作经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllWorkExperience({
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
    sort?: Array<`${keyof WorkExperience},${"asc" | "desc"}`>;
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
       * 工作经历列表
       */
      workExperiences: Array<WorkExperience>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/workExperiences",
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
   * 删除工作经历
   * 删除工作经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteWorkExperience({
    userInfoId,
    workExperienceId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 工作经历ID
     */
    workExperienceId: string;
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
     * 工作经历
     */
    body: WorkExperience;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/workExperiences/{workExperienceId}",
      path: {
        userInfoId: userInfoId,
        workExperienceId: workExperienceId,
      },
    });
  }

  /**
   * 查询工作经历
   * 查询工作经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getWorkExperience({
    userInfoId,
    workExperienceId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 工作经历ID
     */
    workExperienceId: string;
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
     * 工作经历
     */
    body: WorkExperience;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/workExperiences/{workExperienceId}",
      path: {
        userInfoId: userInfoId,
        workExperienceId: workExperienceId,
      },
    });
  }

  /**
   * 修改工作经历
   * 修改工作经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateWorkExperience({
    userInfoId,
    workExperienceId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 工作经历ID
     */
    workExperienceId: string;
    requestBody?: WorkExperience;
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
     * 工作经历
     */
    body: WorkExperience;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/workExperiences/{workExperienceId}",
      path: {
        userInfoId: userInfoId,
        workExperienceId: workExperienceId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
