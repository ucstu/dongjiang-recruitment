/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { JobExpectation } from "../models/JobExpectation";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantJobExpectationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加求职期望
   * 增加求职期望的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addJobExpectation({
    userInfoId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    requestBody?: {
      /**
       * {1:全职,2:兼职,3:实习}
       */
      positionType: 0 | 1 | 2 | 3;
      /**
       * 细分标签
       */
      directionTags?: Array<string>;
      /**
       * 职位名称
       */
      positionName: string;
      /**
       * 单位K
       */
      startingSalary: number;
      /**
       * 单位K
       */
      ceilingSalary: number;
      /**
       * 期望城市
       */
      cityName: string;
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
     * 求职期望
     */
    body: JobExpectation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/jobExpectations",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有求职期望
   * 查询所有求职期望的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllJobExpectation({
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
    sort?: Array<`${keyof JobExpectation},${"asc" | "desc"}`>;
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
       * 求职期望列表
       */
      jobExpectations: Array<JobExpectation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/jobExpectations",
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
   * 删除求职期望
   * 删除求职期望的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteJobExpectation({
    userInfoId,
    jobExpectationId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 求职期望ID
     */
    jobExpectationId: string;
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
     * 求职期望
     */
    body: JobExpectation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/jobExpectations/{jobExpectationId}",
      path: {
        userInfoId: userInfoId,
        jobExpectationId: jobExpectationId,
      },
    });
  }

  /**
   * 查询求职期望
   * 查询求职期望的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getJobExpectation({
    userInfoId,
    jobExpectationId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 求职期望ID
     */
    jobExpectationId: string;
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
     * 求职期望
     */
    body: JobExpectation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/jobExpectations/{jobExpectationId}",
      path: {
        userInfoId: userInfoId,
        jobExpectationId: jobExpectationId,
      },
    });
  }

  /**
   * 修改求职期望
   * 修改求职期望的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateJobExpectation({
    userInfoId,
    jobExpectationId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 求职期望ID
     */
    jobExpectationId: string;
    requestBody?: JobExpectation;
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
     * 求职期望
     */
    body: JobExpectation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/jobExpectations/{jobExpectationId}",
      path: {
        userInfoId: userInfoId,
        jobExpectationId: jobExpectationId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
