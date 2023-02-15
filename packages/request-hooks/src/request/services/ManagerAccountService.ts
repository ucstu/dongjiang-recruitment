/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountInformation } from "../models/AccountInformation";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class ManagerAccountService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加账号信息
   * @returns any 成功
   * @throws ApiError
   */
  public superAddAccount({
    requestBody,
  }: {
    requestBody?: {
      /**
       * {1:用户,2:HR}
       */
      accountType: 1 | 2;
      /**
       * 用户名
       */
      userName: string;
      /**
       * 详细信息ID
       */
      fullInformationId: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/admin/accounts",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 删除账号信息
   * @returns any 成功
   * @throws ApiError
   */
  public superDeleteAccount({
    accountId,
  }: {
    /**
     * 账号ID
     */
    accountId: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/admin/accounts/{accountId}",
      path: {
        accountId: accountId,
      },
    });
  }

  /**
   * 修改账号信息
   * @returns any 成功
   * @throws ApiError
   */
  public superUpdateAccount({
    accountId,
    requestBody,
  }: {
    /**
     * 账号ID
     */
    accountId: string;
    requestBody?: AccountInformation;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/admin/accounts/{accountId}",
      path: {
        accountId: accountId,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询账号信息
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAccount({
    accountId,
  }: {
    /**
     * 账号ID
     */
    accountId: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    /**
     * 账号信息
     */
    body: AccountInformation;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/admin/accounts/{accountId}",
      path: {
        accountId: accountId,
      },
    });
  }

  /**
   * 查询所有账号信息
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAllAccounts({
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
    sort?: Array<`${keyof AccountInformation},${"asc" | "desc"}`>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: {
      totalCount: number;
      /**
       * 账号信息
       */
      accountInformations: AccountInformation;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/admin/accounts/",
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }
}
