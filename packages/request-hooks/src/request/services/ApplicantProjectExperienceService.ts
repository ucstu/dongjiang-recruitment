/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ProjectExperience } from "../models/ProjectExperience";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantProjectExperienceService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加项目经历
   * 增加项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addProjectExperience({
    userInfoId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    requestBody?: {
      /**
       * 项目名称
       */
      projectName: string;
      /**
       * 项目描述
       */
      projectDescription: string;
      /**
       * 我的成就
       */
      achievement?: string;
      /**
       * 开始时间
       */
      startTime: string;
      /**
       * 结束时间
       */
      endTime: string;
      /**
       * 项目链接
       */
      projectLink?: string;
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
     * 项目经历
     */
    body: ProjectExperience;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/projectExperiences",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有项目经历
   * 查询所有项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllProjectExperience({
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
    sort?: Array<`${keyof ProjectExperience},${"asc" | "desc"}`>;
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
       * 项目经历列表
       */
      projectExperiences: Array<ProjectExperience>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/projectExperiences",
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
   * 删除项目经历
   * 删除项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteProjectExperience({
    userInfoId,
    projectExperienceId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 项目经历ID
     */
    projectExperienceId: string;
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
     * 项目经历
     */
    body: ProjectExperience;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/projectExperiences/{projectExperienceId}",
      path: {
        userInfoId: userInfoId,
        projectExperienceId: projectExperienceId,
      },
    });
  }

  /**
   * 修改项目经历
   * 修改项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateProjectExperience({
    userInfoId,
    projectExperienceId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 项目经历ID
     */
    projectExperienceId: string;
    requestBody?: ProjectExperience;
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
     * 项目经历
     */
    body: ProjectExperience;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/projectExperiences/{projectExperienceId}",
      path: {
        userInfoId: userInfoId,
        projectExperienceId: projectExperienceId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询项目经历
   * 查询项目经历的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getProjectExperience({
    userInfoId,
    projectExperienceId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 项目经历ID
     */
    projectExperienceId: string;
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
     * 项目经历
     */
    body?: ProjectExperience;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/projectExperiences/{projectExperienceId}",
      path: {
        userInfoId: userInfoId,
        projectExperienceId: projectExperienceId,
      },
    });
  }
}
