/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AreaInformations } from "../models/AreaInformations";
import type { CityInformations } from "../models/CityInformations";
import type { DirectionTags } from "../models/DirectionTags";
import type { FilterInformation } from "../models/FilterInformation";
import type { PositionTypes } from "../models/PositionTypes";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class CommonService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 查询地区信息
   * 查询地区信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getAreaInformations({
    cityName,
  }: {
    /**
     * 城市名称
     */
    cityName: string;
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
     * 地区信息
     */
    body: AreaInformations;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/areaInformations",
      query: {
        cityName: cityName,
      },
    });
  }

  /**
   * 查询城市信息
   * 查询城市信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getCityInformations(): CancelablePromise<{
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
     * 城市信息
     */
    body: CityInformations;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/cityInformations",
    });
  }

  /**
   * 查询筛选信息
   * 查询筛选信息的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getFilterInformation(): CancelablePromise<{
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
     * 筛选信息
     */
    body: FilterInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/filterInformation",
    });
  }

  /**
   * 查询职位类型
   * 查询职位类型的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getPositionTypes(): CancelablePromise<{
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
     * 职位类型
     */
    body: PositionTypes;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/positionTypes",
    });
  }

  /**
   * 查询细分标签
   * 查询细分标签的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getDirectionTags({
    positionName,
  }: {
    /**
     * 职位名称
     */
    positionName: string;
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
     * 细分标签
     */
    body: DirectionTags;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/directionTags",
      query: {
        positionName: positionName,
      },
    });
  }

  /**
   * 查询推荐人才
   * 查询推荐人才的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getRecommendations(): CancelablePromise<{
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
     * 用户信息ID
     */
    body: Array<string>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/recommendations",
    });
  }

  /**
   * 查询新版本
   * 查询最新版本的接口
   * @returns any 成功
   * @throws ApiError
   */
  public getNewVersion(): CancelablePromise<{
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
     * 版本信息
     */
    body: number;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/newVersion",
    });
  }

  /**
   * 上传文件
   * 上传文件的接口
   * @returns any 成功
   * @throws ApiError
   */
  public uploadFile({ file }: { file?: File }): CancelablePromise<{
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
     * 文件链接
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "UPLOAD",
      url: "/files",
      body: file,
    });
  }

  /**
   * 上传头像
   * 上传头像使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public uploadAvatar({
    formData,
  }: {
    formData?: {
      /**
       * 头像
       */
      avatar: Blob;
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
     * 头像链接
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/avatars",
      formData: formData,
      mediaType: "multipart/form-data",
    });
  }

  /**
   * 获取验证码
   * 获取验证码的接口
   * @returns any 成功
   * @throws ApiError
   */
  public sendVerificationCode({
    email,
  }: {
    /**
     * 电子邮箱
     */
    email: string;
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
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/verificationCode",
      query: {
        email: email,
      },
    });
  }
}
