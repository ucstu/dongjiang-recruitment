/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { Account } from "../models/Account";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class AuthenticationAccountService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 添加账号
   * @returns any 成功
   * @throws ApiError
   */
  public addAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 账号类型
       */
      accountType: 0 | 1 | 2 | 3;
      /**
       * 用户名
       */
      userName: string;
      /**
       * 详情ID
       */
      detailId: string;
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
     * 账号
     */
    body: Account;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/authentication/accounts",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询账号
   * @returns any 成功
   * @throws ApiError
   */
  public queryAccounts({
    query,
    page,
    size,
    sort,
  }: {
    /**
     * 查询条件
     */
    query?: string;
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
    sort?: Array<`${keyof Account},${"asc" | "desc"}`>;
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
     * 分页结果
     */
    body: {
      /**
       * 账号总数
       */
      total: number;
      /**
       * 当页账号
       */
      items: Array<Account>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/accounts",
      query: {
        query: query,
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 移除账号
   * @returns any 成功
   * @throws ApiError
   */
  public removeAccount({
    id,
  }: {
    /**
     * 账号ID
     */
    id: string;
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
     * 账户ID
     */
    body: string;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
    });
  }

  /**
   * 修改账号
   * @returns any 成功
   * @throws ApiError
   */
  public updateAccount({
    id,
    requestBody,
  }: {
    /**
     * 账号ID
     */
    id: string;
    requestBody?: Account;
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
     * 账号
     */
    body: Account;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 获取账号
   * @returns any 成功
   * @throws ApiError
   */
  public getAccount({
    id,
  }: {
    /**
     * 账号ID
     */
    id: string;
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
     * 账号
     */
    body: Account;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/authentication/accounts/{id}",
      path: {
        id: id,
      },
    });
  }
}
