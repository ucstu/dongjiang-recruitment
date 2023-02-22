/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInformation } from "../models/AccountInformation";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AccountService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 注册账号
   * 这是注册账号使用的接口
   * @returns any 成功
   * @throws ApiError
   */
  public registerAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名
       */
      userName: string;
      /**
       * 短信验证码
       */
      verificationCode: string;
      /**
       * {0:Manager,1:Applicant,2:Personnel,3:Advertiser}
       */
      accountType: 1 | 2 | 3;
      /**
       * 密码
       */
      password: string;
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
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/accountInfos",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 登录账号
   * 这是一个用来登录的接口
   * @returns any 成功
   * @throws ApiError
   */
  public loginAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名
       */
      userName: string;
      /**
       * 密码
       */
      password: string;
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
     * 响应结果
     */
    body: {
      /**
       * TOKEN
       */
      token: string;
      /**
       * 账号信息
       */
      accountInformation: AccountInformation;
    };
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/accountInfos/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 注销账号
   * 注销账号的接口
   * @returns any 成功
   * @throws ApiError
   */
  public destroyAccount({
    accountInfoId,
    verificationCode,
  }: {
    /**
     * 账号ID
     */
    accountInfoId: string;
    /**
     * 验证码
     */
    verificationCode: string;
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
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/accountInfos/{accountInfoId}",
      path: {
        accountInfoId: accountInfoId,
      },
      query: {
        verificationCode: verificationCode,
      },
    });
  }

  /**
   * 修改密码
   * 修改密码的接口
   * @returns any 成功
   * @throws ApiError
   */
  public changePassword({
    accountInfoId,
    requestBody,
  }: {
    accountInfoId: string;
    requestBody?: {
      /**
       * 密码
       */
      password: string;
      /**
       * 验证码
       */
      verificationCode: string;
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
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/accountInfos/{accountInfoId}",
      path: {
        accountInfoId: accountInfoId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 忘记密码
   * 忘记密码的接口
   * @returns any 成功
   * @throws ApiError
   */
  public forgetPassword({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 用户名
       */
      userName: string;
      /**
       * 密码
       */
      password: string;
      /**
       * 验证码
       */
      verificationCode: string;
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
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/accountInfos/forget",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
