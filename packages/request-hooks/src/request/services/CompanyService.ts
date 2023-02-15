/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ApplicantInspectionRecord } from "../models/ApplicantInspectionRecord";
import type { CompanyInformation } from "../models/CompanyInformation";
import type { DeliveryRecord } from "../models/DeliveryRecord";
import type { PositionInformation } from "../models/PositionInformation";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class CompanyService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加公司信息
   * 增加公司使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public addCompanyInformation({
    requestBody,
  }: {
    requestBody?: {
      /**
       * LOGO地址
       */
      logoUrl: string;
      /**
       * 公司名称
       */
      companyName: string;
      /**
       * 在招职位
       */
      recruitmentPosition: number;
      /**
       * 所在城市
       */
      cityName: string;
      /**
       * {1:未融资,2:天使轮,3:A轮,4:B轮,5:C轮,6:D轮及以上,7:上市公司,8:不需要融资}
       */
      financingStage: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
      /**
       * {1:少于15人,2:15-50人,3:50-150人,4:150-500人,5:500-2000人,6:2000以上}
       */
      scale: 0 | 1 | 2 | 3 | 4 | 5 | 6;
      /**
       * 领域名称
       */
      comprehensionName: string;
      /**
       * 详细地址
       */
      address: string;
      /**
       * 扩展信息
       */
      about?: string;
      /**
       * 公司全称
       */
      fullName?: string;
      /**
       * 法定代表人
       */
      legalRepresentative?: string;
      /**
       * 注册资本
       */
      registeredCapital?: string;
      /**
       * 机构类型
       */
      organizationType?: string;
      /**
       * 成立时间
       */
      establishmentTime?: string;
      /**
       * 公司福利
       */
      benefits: Array<string>;
      /**
       * 公司地点
       */
      location: {
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
     * 公司信息
     */
    body: CompanyInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/companyInfos",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有公司信息
   * 查询公司信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAllCompanyInformation({
    companyName,
    scales,
    financingStages,
    comprehensions,
    location,
    page,
    size,
    sort,
  }: {
    /**
     * 公司名称，eg：东江招聘
     */
    companyName?: string;
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
    location?: string;
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
    sort?: Array<`${keyof CompanyInformation},${"asc" | "desc"}`>;
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
       * 公司信息列表
       */
      companyInformations: Array<CompanyInformation>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companyInfos",
      query: {
        companyName: companyName,
        scales: scales,
        financingStages: financingStages,
        comprehensions: comprehensions,
        location: location,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 修改公司信息
   * 修改公司信息使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public updateCompanyInformation({
    companyInfoId,
    requestBody,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    requestBody?: CompanyInformation;
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
     * 公司信息
     */
    body: CompanyInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/companyInfos/{companyInfoId}",
      path: {
        companyInfoId: companyInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询公司信息
   * 查询公司信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getCompanyInformation({
    companyInfoId,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
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
     * 公司信息
     */
    body: CompanyInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companyInfos/{companyInfoId}",
      path: {
        companyInfoId: companyInfoId,
      },
    });
  }

  /**
   * 查询所有投递记录
   * 查询所有投递记录使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAllDeliveryRecord({
    companyInfoId,
    status,
    createdAt,
    updatedAt,
    interviewTime,
    workingYears,
    sexs,
    ages,
    positionInfoIds,
    deliveryDates,
    userName,
    page,
    size,
    sort,
  }: {
    companyInfoId: string;
    /**
     * 投递状态枚举数组，{1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
     */
    status: Array<string>;
    /**
     * 投递时间，eg：2022-04-02
     */
    createdAt?: string;
    /**
     * 修改时间，eg：2022-04-06
     */
    updatedAt?: string;
    /**
     * 面试时间，eg：2022-02-03
     */
    interviewTime?: string;
    /**
     * 工作经验枚举数组，{1:经验不限,2:在校/应届,3:3年及以下,4:3-5年,5:5-10年,6:10年以上}
     */
    workingYears?: Array<string>;
    /**
     * 性别数组，eg：["男","女"]
     */
    sexs?: Array<string>;
    /**
     * 年龄数组
     */
    ages?: Array<string>;
    /**
     * 职位信息ID数组，eg：["3d32dbEE-bbf8-A1Fc-f9Ad-F96f96dA5e8b"]
     */
    positionInfoIds?: Array<string>;
    /**
     * 投递日期数组，eg：["2007-02-22","2007-02-23"]
     */
    deliveryDates?: Array<string>;
    /**
     * 用户名，eg：张三
     */
    userName?: string;
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
      url: "/companyInfos/{companyInfoId}/deliveryRecords",
      path: {
        companyInfoId: companyInfoId,
      },
      query: {
        createdAt: createdAt,
        updatedAt: updatedAt,
        status: status,
        interviewTime: interviewTime,
        workingYears: workingYears,
        sexs: sexs,
        ages: ages,
        positionInfoIds: positionInfoIds,
        deliveryDates: deliveryDates,
        userName: userName,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 查询所有职位信息
   * 查询所有职位信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAllPositionInformation({
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
    sort?: Array<`${keyof PositionInformation},${"asc" | "desc"}`>;
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
      url: "/companyInfos/positionInfos",
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
   * 查询历史大数据
   * 查询历史大数据的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getBigData({
    companyInfoId,
    hrInformationId,
    startDate,
    endDate,
    page,
    size,
    sort,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    /**
     * HR信息ID
     */
    hrInformationId: string;
    /**
     * 起始时间，eg：2022-02-01
     */
    startDate: string;
    /**
     * 结束时间，eg：2022-02-04
     */
    endDate: string;
    /**
     * 当前页，eg：0
     */
    page?: number;
    /**
     * 页大小，eg：5
     */
    size?: number;
    /**
     * 排序方式，eg：["date,desc"]
     */
    sort?: Array<string>;
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
     * 历史大数据列表
     */
    body: Array<{
      /**
       * 记录日期
       */
      date: string;
      /**
       * 浏览记录数量
       */
      inspectionRecordCount: number;
      /**
       * 投递记录数量
       */
      deliveryRecordCount: number;
      /**
       * 在线沟通数量
       */
      onlineCommunicateCount: number;
    }>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companyInfos/{companyInfoId}/bigData",
      path: {
        companyInfoId: companyInfoId,
      },
      query: {
        hrInformationId: hrInformationId,
        startDate: startDate,
        endDate: endDate,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 查询谁看过我记录
   * 查询谁看过我记录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getHrSawMeRecord({
    companyInfoId,
    startDate,
    endDate,
    page,
    size,
    sort,
  }: {
    /**
     * 公司信息ID
     */
    companyInfoId: string;
    /**
     * 开始时间，eg：2020-02-03
     */
    startDate: string;
    /**
     * 结束时间，eg：2020-02-07
     */
    endDate: string;
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
      hrInspectionRecords: Array<ApplicantInspectionRecord>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/companyInfos/{companyInfoId}/sawMeRecords",
      path: {
        companyInfoId: companyInfoId,
      },
      query: {
        startDate: startDate,
        endDate: endDate,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
