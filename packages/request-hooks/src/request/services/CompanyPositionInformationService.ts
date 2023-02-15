/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PositionInformation } from "../models/PositionInformation";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class CompanyPositionInformationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加职位信息
   * 增加职位信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addPositionInformation({
    companyInfoId,
    requestBody,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    requestBody?: {
      /**
       * 职位名称
       */
      positionName: string;
      /**
       * 职位类型
       */
      positionType: string;
      /**
       * {1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
       */
      workingYears: 0 | 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * {1:不要求,2:大专,3:本科,4:硕士,5:博士}
       */
      education: 0 | 1 | 2 | 3 | 4 | 5;
      /**
       * 细分标签
       */
      directionTags?: Array<string>;
      /**
       * 单位K
       */
      startingSalary: number;
      /**
       * 单位K
       */
      ceilingSalary: number;
      /**
       * 工作省份
       */
      workProvinceName: string;
      /**
       * 工作城市
       */
      workCityName: string;
      /**
       * 工作地区
       */
      workAreaName: string;
      /**
       * 公司信息ID
       */
      companyInformationId: string;
      /**
       * HR信息ID
       */
      hrInformationId: string;
      /**
       * {1:全职,2:兼职,3:实习}
       */
      workType: 0 | 1 | 2 | 3;
      /**
       * 所属部门
       */
      departmentName?: string;
      /**
       * 职位亮点
       */
      highlights?: Array<string>;
      /**
       * 职位描述
       */
      description: string;
      /**
       * {1:周末双休:,2:周末单休,3:大小周}
       */
      weekendReleaseTime?: 0 | 1 | 2 | 3;
      /**
       * 上班时间
       */
      workTime: string;
      /**
       * 下班时间
       */
      overTime: string;
      /**
       * 面试信息
       */
      interviewInfo: {
        /**
         * {1:现场面试,2:视频面试,3:电话面试}
         */
        situation: 1 | 2 | 3;
        /**
         * {1:1-2轮次,2:3-4轮次,3:5-6轮次,4:暂不确定}
         */
        wheel: 1 | 2 | 3 | 4;
        /**
         * {1:一天内完成,2:分多次完成}
         */
        time: 1 | 2;
        /**
         * {1:可周末面试,2:包含笔试,3:可下班面试,4:包含面试作业}
         */
        illustrate: 1 | 2 | 3 | 4;
      };
      /**
       * 工作地点
       */
      workingPlace: {
        /**
         * 经度
         */
        longitude: number;
        /**
         * 纬度
         */
        latitude: number;
      };
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
     * 职位信息
     */
    body: PositionInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/companyInfos/{companyInfoId}/positionInfos",
      path: {
        companyInfoId: companyInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有职位信息
   * 查询职位信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllPositionInformation({
    companyInfoId,
    positionName,
    positionType,
    salary,
    workingYears,
    educations,
    directionTags,
    workProvinceName,
    workCityName,
    workAreaNames,
    workTypes,
    scales,
    financingStages,
    comprehensions,
    workingPlace,
    page,
    size,
    sort,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    /**
     * 职位名称，eg：前端开发
     */
    positionName?: string;
    /**
     * 职位类型，eg：前端工程师
     */
    positionType?: string;
    /**
     * 薪资范围，(start,end) ，单位K，eg：1,4
     */
    salary?: string;
    /**
     * 工作年限枚举数组，{1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
     */
    workingYears?: Array<string>;
    /**
     * 学历要求枚举数组，{1:不要求,2:大专,3:本科,4:硕士,5:博士}
     */
    educations?: Array<string>;
    /**
     * 细分标签名数组，eg：["Vue","React"]
     */
    directionTags?: Array<string>;
    /**
     * 工作省份，eg：四川省
     */
    workProvinceName?: string;
    /**
     * 工作城市，eg：成都市
     */
    workCityName?: string;
    /**
     * 工作区县名数组，eg：["合川区","永川区"]
     */
    workAreaNames?: Array<string>;
    /**
     * 职位类型枚举数组，{1:全职,2:兼职,3:实习}
     */
    workTypes?: Array<string>;
    /**
     * 公司规模枚举数组，{1:少于15人,2:15-50人,3:50-150人,4:150-500人,5:500-2000人,6:2000以上}
     */
    scales?: Array<string>;
    /**
     * 融资阶段枚举数组，{1:未融资,2:天使轮,3:A轮,4:B轮,5:C轮,6:D轮及以上,7:上市公司,8:不需要融资}
     */
    financingStages?: Array<string>;
    /**
     * 领域名数组，eg：["电商平台","游戏"]
     */
    comprehensions?: Array<string>;
    /**
     * 经纬度坐标，eg：99.748,74.391846196586
     */
    workingPlace?: string;
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
    sort?: Array<`${keyof PositionInformation} ${"asc" | "desc"}`>;
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
       * 职位信息列表
       */
      positionInformations: Array<PositionInformation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companyInfos/{companyInfoId}/positionInfos",
      path: {
        companyInfoId: companyInfoId,
      },
      query: {
        positionName: positionName,
        positionType: positionType,
        salary: salary,
        workingYears: workingYears,
        educations: educations,
        directionTags: directionTags,
        workProvinceName: workProvinceName,
        workCityName: workCityName,
        workAreaNames: workAreaNames,
        workTypes: workTypes,
        scales: scales,
        financingStages: financingStages,
        comprehensions: comprehensions,
        workingPlace: workingPlace,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除职位信息
   * 删除职位信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public deletePositionInformation({
    companyInfoId,
    positionInfoId,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    /**
     * 职位信息ID
     */
    positionInfoId: string;
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
     * 职位信息
     */
    body: PositionInformation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/companyInfos/{companyInfoId}/positionInfos/{positionInfoId}",
      path: {
        companyInfoId: companyInfoId,
        positionInfoId: positionInfoId,
      },
    });
  }

  /**
   * 查询职位信息
   * 查询职位信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getPositionInformation({
    companyInfoId,
    positionInfoId,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    /**
     * 职位信息ID
     */
    positionInfoId: string;
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
     * 职位信息
     */
    body: PositionInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companyInfos/{companyInfoId}/positionInfos/{positionInfoId}",
      path: {
        companyInfoId: companyInfoId,
        positionInfoId: positionInfoId,
      },
    });
  }

  /**
   * 修改职位信息
   * 修改职位信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updatePositionInformation({
    companyInfoId,
    positionInfoId,
    requestBody,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    /**
     * 职位信息ID
     */
    positionInfoId: string;
    requestBody?: PositionInformation;
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
     * 职位信息
     */
    body: PositionInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/companyInfos/{companyInfoId}/positionInfos/{positionInfoId}",
      path: {
        companyInfoId: companyInfoId,
        positionInfoId: positionInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
