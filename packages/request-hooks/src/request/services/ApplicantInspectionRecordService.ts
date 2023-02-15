/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicantInspectionRecord } from "../models/ApplicantInspectionRecord";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class ApplicantInspectionRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 删除查看记录
   * 删除用户查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteUserInspectionRecord({
    userInfoId,
    inspectionRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 查看记录ID
     */
    inspectionRecordId: string;
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
     * 查看记录
     */
    body: ApplicantInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/userInfos/{userInfoId}/inspectionRecords/{inspectionRecordId}",
      path: {
        userInfoId: userInfoId,
        inspectionRecordId: inspectionRecordId,
      },
    });
  }

  /**
   * 查询查看记录
   * 查询用户查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getUserInspectionRecord({
    userInfoId,
    inspectionRecordId,
  }: {
    /**
     * 用户信息ID
     */
    userInfoId: string;
    /**
     * 查看记录ID
     */
    inspectionRecordId: string;
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
     * 查看记录
     */
    body: ApplicantInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/inspectionRecords/{inspectionRecordId}",
      path: {
        userInfoId: userInfoId,
        inspectionRecordId: inspectionRecordId,
      },
    });
  }

  /**
   * 查询所有查看记录
   * 查询所有用户查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllUserInspectionRecord({
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
    sort?: Array<`${keyof ApplicantInspectionRecord},${"asc" | "desc"}`>;
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
       * 查看记录列表
       */
      userInspectionRecords: Array<ApplicantInspectionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/userInfos/{userInfoId}/inspectionRecords",
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
}
