/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicantInspectionRecord } from "../models/ApplicantInspectionRecord";
import type { PersonnelInspectionRecord } from "../models/PersonnelInspectionRecord";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class PersonnelInspectionRecordService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 删除查看记录
   * 删除HR查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deleteHrInspectionRecord({
    hrInfoId,
    inspectionRecordId,
  }: {
    /**
     * 用户信息ID
     */
    hrInfoId: string;
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
    body: PersonnelInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/hrInfos/{hrInfoId}/inspectionRecords/{inspectionRecordId}",
      path: {
        hrInfoId: hrInfoId,
        inspectionRecordId: inspectionRecordId,
      },
    });
  }

  /**
   * 查询查看记录
   * 查询HR查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getHrInspectionRecord({
    hrInfoId,
    inspectionRecordId,
  }: {
    /**
     * 用户信息ID
     */
    hrInfoId: string;
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
    body: PersonnelInspectionRecord;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/hrInfos/{hrInfoId}/inspectionRecords/{inspectionRecordId}",
      path: {
        hrInfoId: hrInfoId,
        inspectionRecordId: inspectionRecordId,
      },
    });
  }

  /**
   * 查询所有查看记录
   * 查询所有HR查看记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllHrInspectionRecord({
    hrInfoId,
    page,
    size,
    sort,
  }: {
    /**
     * 用户信息ID
     */
    hrInfoId: string;
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
       * 用户查看记录列表
       */
      userInspectionRecords: Array<ApplicantInspectionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/hrInfos/{hrInfoId}/inspectionRecords",
      path: {
        hrInfoId: hrInfoId,
      },
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
