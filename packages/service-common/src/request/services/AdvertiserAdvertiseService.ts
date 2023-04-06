/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query, Sort } from "../../interfaces";
import type { Advertise } from "../models/Advertise";
import type { Advertiser } from "../models/Advertiser";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AdvertiserAdvertiseService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加广告
   * @returns any 成功
   * @throws ApiError
   */
  public addAdvertise({
    advertiserid,
    requestBody,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    requestBody?: {
      /**
       * 名称
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
       * 投放位置，eg；{1:Master}
       */
      position: 1;
      /**
       * 投放状态，eg；{1:Active,2:Inactive}
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
      /**
       * 广告商
       */
      advertiser: Advertiser;
    };
  }): CancelablePromise<Advertise> {
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
   * 查询广告
   * @returns any 成功
   * @throws ApiError
   */
  public queryAdvertise({
    advertiserid,
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 查询条件
     */
    query?: Query<Advertise>;
    /**
     * 当前页数
     */
    page?: number;
    /**
     * 页面大小
     */
    size?: number;
    /**
     * 排序方式
     */
    sort?: Sort<Advertise>;
  }): CancelablePromise<{
    /**
     * 广告总数
     */
    total: number;
    /**
     * 当页广告
     */
    items: Array<Advertise>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers/{advertiserid}/advertise",
      path: {
        advertiserid: advertiserid,
      },
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除广告
   * @returns any 成功
   * @throws ApiError
   */
  public removeAdvertise({
    advertiserid,
    id,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 广告ID
     */
    id: string;
  }): CancelablePromise<string> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/advertisers/{advertiserid}/advertise/{id}",
      path: {
        advertiserid: advertiserid,
        id: id,
      },
    });
  }

  /**
   * 修改广告
   * @returns any 成功
   * @throws ApiError
   */
  public updateAdvertise({
    advertiserid,
    id,
    requestBody,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 广告ID
     */
    id: string;
    requestBody?: Advertise;
  }): CancelablePromise<Advertise> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/advertisers/{advertiserid}/advertise/{id}",
      path: {
        advertiserid: advertiserid,
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取广告
   * @returns any 成功
   * @throws ApiError
   */
  public getAdvertise({
    advertiserid,
    id,
  }: {
    /**
     * 广告商ID
     */
    advertiserid: string;
    /**
     * 广告ID
     */
    id: string;
  }): CancelablePromise<Advertise> {
    return this.httpRequest.request({
      method: "GET",
      url: "/advertisers/{advertiserid}/advertise/{id}",
      path: {
        advertiserid: advertiserid,
        id: id,
      },
    });
  }
}
