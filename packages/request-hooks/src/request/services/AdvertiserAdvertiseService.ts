/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdvertisingInformation } from "../models/AdvertisingInformation";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AdvertiserAdvertiseService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加广告信息
   * @returns any 成功
   * @throws ApiError
   */
  public addAdvertisingInformation({
    advertiserid,
    requestBody,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    requestBody?: {
      /**
       * 广告信息ID
       */
      advertisingInformationId: string;
      /**
       * 创建时间
       */
      createdAt: string;
      /**
       * 修改时间
       */
      updatedAt: string;
      /**
       * 广告名称
       */
      name: string;
      /**
       * 网页地址
       */
      pageUrl: string;
      /**
       * 图片地址
       */
      banner: string;
      /**
       * {1:Master}
       */
      position: 1;
      /**
       * {1:Active,2:Expired}
       */
      status: 1 | 2;
      /**
       * 已缴费用
       */
      payed: 1 | 2;
      /**
       * 开始时间
       */
      startTime: string;
      /**
       * 结束时间
       */
      endTime: string;
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
    body: AdvertisingInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/advertisers/{advertiserid}/advertise",
      path: {
        advertiserid: advertiserid,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有广告信息
   * @returns any 成功
   * @throws ApiError
   */
  public getAllAdvertisingInformation({
    advertiserid,
    page,
    size,
    sort,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
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
    sort?: Array<`${keyof AdvertisingInformation},${"asc" | "desc"}`>;
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
    /**
     * 响应体
     */
    body: {
      /**
       * 记录总数
       */
      totalCount: number;
      /**
       * 广告信息
       */
      advertise: Array<AdvertisingInformation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers/{advertiserid}/advertise",
      path: {
        advertiserid: advertiserid,
      },
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除广告信息
   * @returns any 成功
   * @throws ApiError
   */
  public deleteAdvertisingInformation({
    advertiserid,
    advertiseid,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 广告信息ID
     */
    advertiseid: string;
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
    body: AdvertisingInformation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/advertisers/{advertiserid}/advertise/{advertiseid}",
      path: {
        advertiserid: advertiserid,
        advertiseid: advertiseid,
      },
    });
  }

  /**
   * 修改广告信息
   * @returns any 成功
   * @throws ApiError
   */
  public updateAdvertisingInformation({
    advertiserid,
    advertiseid,
    requestBody,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 广告信息ID
     */
    advertiseid: string;
    requestBody?: AdvertisingInformation;
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
    body: AdvertisingInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/advertisers/{advertiserid}/advertise/{advertiseid}",
      path: {
        advertiserid: advertiserid,
        advertiseid: advertiseid,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询广告信息
   * @returns any 成功
   * @throws ApiError
   */
  public getAdvertisingInformation({
    advertiserid,
    advertiseid,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 广告信息ID
     */
    advertiseid: string;
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
    body: AdvertisingInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers/{advertiserid}/advertise/{advertiseid}",
      path: {
        advertiserid: advertiserid,
        advertiseid: advertiseid,
      },
    });
  }
}
