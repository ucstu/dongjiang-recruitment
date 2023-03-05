/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicantInformation } from "../models/ApplicantInformation";
import type { PersonnelInspectionRecord } from "../models/PersonnelInspectionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 修改用户信息
   * 修改用户信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateUserInformation({
    userInfoId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    requestBody?: ApplicantInformation;
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
    body: ApplicantInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询用户信息
   * 查询用户信息得接口
   * @returns any 成功
   * @throws ApiError
   */
  public getUserInformation({
    userInfoId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
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
    body: ApplicantInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}",
      path: {
        userInfoId: userInfoId,
      },
    });
  }

  /**
   * 删除用户信息
   * 删除用户信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteUserInformation({
    userInfoId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
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
    body: ApplicantInformation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}",
      path: {
        userInfoId: userInfoId,
      },
    });
  }

  /**
   * 查询所有用户信息
   * 查询所有用户信息得接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllUserInformation({
    page,
    size,
    sort,
  }: {
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
    sort?: Array<`${keyof ApplicantInformation},${"asc" | "desc"}`>;
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
       * 用户信息列表
       */
      userInformations: Array<ApplicantInformation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos",
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 增加用户信息
   * 增加用户信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addUserInformation({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 头像地址
       */
      avatarUrl: string;
      /**
       * 姓
       */
      firstName: string;
      /**
       * 名
       */
      lastName: string;
      /**
       * 生日
       */
      dateOfBirth: string;
      /**
       * 性别
       */
      sex: string;
      /**
       * 年龄
       */
      age: number;
      /**
       * 所在城市
       */
      cityName: string;
      /**
       * 电子邮箱
       */
      email: string;
      /**
       * {1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
       */
      workingYears: 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * {0:未知,1:大专,2:本科,3:硕士,4:博士}
       */
      education: 0 | 1 | 2 | 3 | 4;
      /**
       * 个人优势
       */
      personalAdvantage: string;
      /**
       * 社交主页
       */
      socialHomepage: string;
      /**
       * {1:随时入职,2:2周内入职,3:1月内入职}
       */
      jobStatus: 0 | 1 | 2 | 3;
      /**
       * 图片作品
       */
      pictureWorks: Array<string>;
      /**
       * {1:实名,2:匿名}
       */
      privacySettings: 1 | 2;
    };
  }): CancelablePromise<{
    /**
     * 请求ID
     */
    requestId?: string;
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 响应信息
     */
    message: string;
    body: ApplicantInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询谁看过我记录
   * 查询谁看过我记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getUserSawMeRecord({
    userInfoId,
    startDate,
    endDate,
    page,
    size,
    sort,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 开始时间，eg：2020-02-03
     */
    startDate: string;
    /**
     * 结束时间，eg：2020-02-07
     */
    endDate: string;
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
    sort?: Array<`${keyof PersonnelInspectionRecord},${"asc" | "desc"}`>;
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
       * HR查看记录列表
       */
      hrInspectionRecords: Array<PersonnelInspectionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/sawMeRecords",
      path: {
        userInfoId: userInfoId,
      },
      query: {
        startDate: startDate,
        endDate: endDate,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
