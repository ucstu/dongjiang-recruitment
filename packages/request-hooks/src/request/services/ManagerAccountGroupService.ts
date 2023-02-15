/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AccountGroup } from "../models/AccountGroup";

import type { BaseHttpRequest } from "../core/BaseHttpRequest";
import type { CancelablePromise } from "../core/CancelablePromise";

export class ManagerAccountGroupService {
  constructor(public readonly httpRequest: BaseHttpRequest) {}

  /**
   * 增加账号组
   * @returns any 成功
   * @throws ApiError
   */
  public superAddAccountGroup({
    requestBody,
  }: {
    requestBody?: {
      /**
       * 账号组名称
       */
      groupName: string;
    };
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountGroup;
  }> {
    return this.httpRequest.request({
      method: "POST",
      url: "/admin/accountgroups",
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询所有账户组信息
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAllAccountGroups({
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
    sort?: Array<`${keyof AccountGroup},${"asc" | "desc"}`>;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: Array<AccountGroup>;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/admin/accountgroups",
      query: {
        page: page,
        size: size,
        sort: sort,
      },
    });
  }

  /**
   * 删除账号组
   * @returns any 成功
   * @throws ApiError
   */
  public superDeleteAccountGroups({
    accountgroupid,
  }: {
    /**
     * 账号组ID
     */
    accountgroupid: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountGroup;
  }> {
    return this.httpRequest.request({
      method: "DELETE",
      url: "/admin/accountgroups/{accountgroupid}",
      path: {
        accountgroupid: accountgroupid,
      },
    });
  }

  /**
   * 修改账号组信息
   * @returns any 成功
   * @throws ApiError
   */
  public superAccountGroups({
    accountgroupid,
    requestBody,
  }: {
    /**
     * 账号组ID
     */
    accountgroupid: string;
    requestBody?: AccountGroup;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountGroup;
  }> {
    return this.httpRequest.request({
      method: "PUT",
      url: "/admin/accountgroups/{accountgroupid}",
      path: {
        accountgroupid: accountgroupid,
      },
      body: requestBody,
      mediaType: "application/json",
    });
  }

  /**
   * 查询账号组信息
   * @returns any 成功
   * @throws ApiError
   */
  public superGetAccountGroups({
    accountgroupid,
  }: {
    /**
     * 账号组ID
     */
    accountgroupid: string;
  }): CancelablePromise<{
    timestamp: string;
    status: number;
    message: string;
    body: AccountGroup;
  }> {
    return this.httpRequest.request({
      method: "GET",
      url: "/admin/accountgroups/{accountgroupid}",
      path: {
        accountgroupid: accountgroupid,
      },
    });
  }
}
