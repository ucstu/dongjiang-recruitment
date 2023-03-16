/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AdvertiserInformation } from "../models/AdvertiserInformation";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AdvertiserService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加广告商信息
   * @returns any 成功
   * @throws ApiError
   */
  public addAdvertiserInformation({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 广告商名称
       */
      name: string;
      /**
       * 网页地址
       */
      pageUrl: string;
      /**
       * Logo地址
       */
      logoUrl: string;
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
    body: AdvertiserInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/advertisers",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有广告商信息
   * @returns any 成功
   * @throws ApiError
   */
  public getAllAdvertiserInformation({
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
    sort?: Array<`${keyof AdvertiserInformation},${"asc" | "desc"}`>;
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
       * 当页内容
       */
      advertisers: Array<AdvertiserInformation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers",
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除广告商信息
   * @returns any 成功
   * @throws ApiError
   */
  public deleteAdvertiserInformation({
    advertiserid,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
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
    body: AdvertiserInformation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/advertisers/{advertiserid}",
      path: {
        advertiserid: advertiserid,
      },
    });
  }

  /**
   * 修改广告商信息
   * @returns any 成功
   * @throws ApiError
   */
  public updateAdvertiserInformation({
    advertiserid,
    requestBody,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    requestBody?: {
      /**
       * 广告商信息ID
       */
      advertiserInformationId: string;
      /**
       * 创建时间
       */
      createdAt: string;
      /**
       * 修改时间
       */
      updatedAt: string;
      /**
       * 广告商名称
       */
      name: string;
      /**
       * 网页地址
       */
      pageUrl: string;
      /**
       * Logo地址
       */
      logoUrl: string;
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
    body: AdvertiserInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/advertisers/{advertiserid}",
      path: {
        advertiserid: advertiserid,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询广告商信息
   * @returns any 成功
   * @throws ApiError
   */
  public getAdvertiserInformation({
    advertiserid,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
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
    body: AdvertiserInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers/{advertiserid}",
      path: {
        advertiserid: advertiserid,
      },
    });
  }
}
