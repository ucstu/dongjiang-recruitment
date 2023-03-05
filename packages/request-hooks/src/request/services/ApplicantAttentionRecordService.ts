/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttentionRecord } from "../models/AttentionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ApplicantAttentionRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加关注记录
   * 增加关注记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addAttentionRecord({
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
     * 关注记录
     */
    body: AttentionRecord;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/userInfos/{userInfoId}/attentionRecords",
      path: {
        userInfoId: userInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有关注记录
   * 查询所有关注记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllAttentionRecord({
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
    sort?: Array<`${keyof AttentionRecord},${"asc" | "desc"}`>;
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
       * 关注记录列表
       */
      attentionRecords: Array<AttentionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/attentionRecords",
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
   * 删除关注记录
   * 删除关注记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteAttentionRecord({
    userInfoId,
    attentionRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 关注记录ID
     */
    attentionRecordId: string;
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
     * 关注记录
     */
    body: AttentionRecord;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/attentionRecords/{attentionRecordId}",
      path: {
        userInfoId: userInfoId,
        attentionRecordId: attentionRecordId,
      },
    });
  }

  /**
   * 修改关注记录
   * 修改关注记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateAttentionRecord({
    userInfoId,
    attentionRecordId,
    requestBody,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 关注记录ID
     */
    attentionRecordId: string;
    requestBody?: AttentionRecord;
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
     * 关注记录
     */
    body: AttentionRecord;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/userInfos/{userInfoId}/attentionRecords/{attentionRecordId}",
      path: {
        userInfoId: userInfoId,
        attentionRecordId: attentionRecordId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询关注记录
   * 查询关注记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAttentionRecord({
    userInfoId,
    attentionRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 关注记录ID
     */
    attentionRecordId: string;
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
     * 关注记录
     */
    body: AttentionRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/attentionRecords/{attentionRecordId}",
      path: {
        userInfoId: userInfoId,
        attentionRecordId: attentionRecordId,
      },
    });
  }
}
