/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DeliveryRecord } from "../models/DeliveryRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantDeliveryRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加投递记录
   * 增加投递记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addDeliveryRecord({
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
     * 投递记录
     */
    body: DeliveryRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/deliveryRecords",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有投递记录
   * 查询所有投递记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllDeliveryRecord({
    userInfoId,
    status,
    interviewTime,
    page,
    size,
    sort,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 投递状态枚举数组，{1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
     */
    status: Array<string>;
    /**
     * 面试时间，eg：2022-02-03
     */
    interviewTime?: string;
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
    sort?: Array<`${keyof DeliveryRecord},${"asc" | "desc"}`>;
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
       * 投递记录列表
       */
      deliveryRecords: Array<DeliveryRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/deliveryRecords",
      path: {
        userInfoId: userInfoId,
      },
      query: {
        status: status,
        interviewTime: interviewTime,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除投递记录
   * 删除投递记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteDeliveryRecord({
    userInfoId,
    deliveryRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 投递记录ID
     */
    deliveryRecordId: string;
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
     * 投递记录
     */
    body: DeliveryRecord;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/deliveryRecords/{deliveryRecordId}",
      path: {
        userInfoId: userInfoId,
        deliveryRecordId: deliveryRecordId,
      },
    });
  }

  /**
   * 修改投递记录
   * 修改投递记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateDeliveryRecord({
    userInfoId,
    deliveryRecordId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 投递记录ID
     */
    deliveryRecordId: string;
    requestBody?: DeliveryRecord;
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
     * 投递记录
     */
    body: DeliveryRecord;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/deliveryRecords/{deliveryRecordId}",
      path: {
        userInfoId: userInfoId,
        deliveryRecordId: deliveryRecordId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询投递记录
   * 查询投递记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getDeliveryRecord({
    userInfoId,
    deliveryRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 投递记录ID
     */
    deliveryRecordId: string;
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
     * 投递记录
     */
    body: DeliveryRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/deliveryRecords/{deliveryRecordId}",
      path: {
        userInfoId: userInfoId,
        deliveryRecordId: deliveryRecordId,
      },
    });
  }
}
