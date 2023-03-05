/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountAuthority } from "../models/AccountAuthority";

import type { CancelablePromise } from "../core/CancelablePromise";
import type { BaseHttpRequest } from "../core/BaseHttpRequest";

export class ManagerAccountAuthoritiesService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加账号权限
   * @returns any 成功
   * @throws ApiError
   */
  public superAddAccountAuthorities({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 账号权限名称
       */
      authorityName: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountAuthority;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/admin/accountauthorities",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有账号权限信息
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAllAccountAuthorities({
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
    sort?: Array<`${keyof AccountAuthority},${"asc" | "desc"}`>;
  }): CancelablePromise<{
    /**
     * 请求ID
     */
    requestId?: string;
    /**
     * 响应时间
     */
    timestamp: string;
    /**
     * 响应编码
     */
    status: number;
    /**
     * 响应信息
     */
    message: string;
    /**
     * 响应体
     */
    body: {
      /**
       * 记录总数
       */
      totalCount: number;
      /**
       * 账号权限
       */
      accountAuthorities: Array<AccountAuthority>;
    };
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/admin/accountauthorities",
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除账号权限信息
   * @returns any 成功
   * @throws ApiError
   */
  public superDeleteAccountAuthorities({
    accountauthorityid,
  }: {
    /**
     * 账号权限ID
     */
    accountauthorityid: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountAuthority;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/admin/accountauthorities/{accountauthorityid}",
      path: {
        accountauthorityid: accountauthorityid,
      },
    });
  }

  /**
   * 修改账号权限信息
   * @returns any 成功
   * @throws ApiError
   */
  public superUpdateAccountAuthorities({
    accountauthorityid,
    requestBody,
  }: {
    /**
     * 账号权限ID
     */
    accountauthorityid: string;
    requestBody?: AccountAuthority;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountAuthority;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/admin/accountauthorities/{accountauthorityid}",
      path: {
        accountauthorityid: accountauthorityid,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询账号权限信息
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAccountAuthorities({
    accountauthorityid,
  }: {
    /**
     * 账号权限ID
     */
    accountauthorityid: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountAuthority;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/admin/accountauthorities/{accountauthorityid}",
      path: {
        accountauthorityid: accountauthorityid,
      },
    });
  }
}
