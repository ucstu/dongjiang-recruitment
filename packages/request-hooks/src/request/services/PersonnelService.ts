/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PersonnelInformation } from "../models/PersonnelInformation";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class PersonnelService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 修改人管信息
   * 修改人管信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateHrInformation({
    hrInfoId,
    requestBody,
  }: {
    /**
     * HR信息ID
     */
    hrInfoId: string;
    requestBody?: PersonnelInformation;
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
    body: PersonnelInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/hrInfos/{hrInfoId}",
      path: {
        hrInfoId: hrInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询人管信息
   * 查询人管信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getHrInformation({
    hrInfoId,
  }: {
    /**
     * 公司信息ID
     */
    hrInfoId: string;
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
    body: PersonnelInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/hrInfos/{hrInfoId}",
      path: {
        hrInfoId: hrInfoId,
      },
    });
  }

  /**
   * 查询所有人管信息
   * 查询所有人管信息用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllHrInformation({
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
    sort?: Array<`${keyof PersonnelInformation},${"asc" | "desc"}`>;
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
       * HR信息列表
       */
      HrInformations: Array<PersonnelInformation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/hrInfos",
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
