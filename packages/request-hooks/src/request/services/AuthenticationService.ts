/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Query } from "../../interfaces";
import type { Account } from "../models/Account";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthenticationService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 注销账号
   * @returns any 成功
   * @throws ApiError
   */
  public destroyAccount({
    id,
    verificationCode,
  }: {
    /**
     * 账号ID
     */
    id: string;
    /**
     * 验证码
     */
    verificationCode: string;
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 账号ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/authentication/actions/destory/{id}",
      path: {
        id: id,
      },
      query: {
        verificationCode: verificationCode,
      },
    });
  }

  /**
   * 修改密码
   * @returns any 成功
   * @throws ApiError
   */
  public changePassword({
    id,
    requestBody,
  }: {
    /**
     * 账号ID
     */
    id: string;
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
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 修改状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/actions/changePassword/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 登录账号
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
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 响应体
     */
    body: {
      /**
       * 授权令牌
       */
      token: string;
      /**
       * 账号
       */
      account: Account;
    };
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/actions/login",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 忘记密码
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
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 忘记状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/actions/forget",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 注册账号
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
       * 账号类型
       */
      accountType: 0 | 1 | 2 | 3;
      /**
       * 密码
       */
      password: string;
    };
  }): CancelablePromise<{
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应
     */
    message: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 注册状态
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/actions/register",
      body: requestBody,
      mediaType: "application/json",
    });
  }
}
