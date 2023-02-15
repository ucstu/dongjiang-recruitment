/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { GarnerRecord } from "../models/GarnerRecord";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class ApplicantGarnerRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加收藏记录
   * 增加收藏记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addGarnerRecord({
    userInfoId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    requestBody?: {
      /**
       * 用户信息ID
       */
      userInformationId: string;
      /**
       * 公司信息ID
       */
      companyInformationId: string;
      /**
       * 职位信息ID
       */
      positionInformationId: string;
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
     * 收藏记录
     */
    body: GarnerRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/garnerRecords",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有收藏记录
   * 查询所有收藏记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllGarnerRecord({
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
    sort?: Array<`${keyof GarnerRecord},${"asc" | "desc"}`>;
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
       * 收藏记录列表
       */
      garnerRecords: Array<GarnerRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/garnerRecords",
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
   * 删除收藏记录
   * 删除收藏记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteGarnerRecord({
    userInfoId,
    garnerRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 收藏记录ID
     */
    garnerRecordId: string;
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
     * 收藏记录
     */
    body: GarnerRecord;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/garnerRecords/{garnerRecordId}",
      path: {
        userInfoId: userInfoId,
        garnerRecordId: garnerRecordId,
      },
    });
  }

  /**
   * 修改收藏记录
   * 修改收藏记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateGarnerRecord({
    userInfoId,
    garnerRecordId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 收藏记录ID
     */
    garnerRecordId: string;
    requestBody?: GarnerRecord;
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
     * 收藏记录
     */
    body: GarnerRecord;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/garnerRecords/{garnerRecordId}",
      path: {
        userInfoId: userInfoId,
        garnerRecordId: garnerRecordId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询收藏记录
   * 查询收藏记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getGarnerRecord({
    userInfoId,
    garnerRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 收藏记录ID
     */
    garnerRecordId: string;
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
     * 收藏记录
     */
    body: GarnerRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/garnerRecords/{garnerRecordId}",
      path: {
        userInfoId: userInfoId,
        garnerRecordId: garnerRecordId,
      },
    });
  }
}
