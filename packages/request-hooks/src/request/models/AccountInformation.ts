/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 账号信息
 */
export type AccountInformation = {
  /**
   * 账号信息ID
   */
  accountInformationId: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updatedAt: string;
  /**
   * {1:用户,2:HR}
   */
  accountType: AccountInformation.accountType;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 详细信息ID
   */
  fullInformationId: string;
};

export namespace AccountInformation {
  /**
   * {1:用户,2:HR}
   */
  export enum accountType {
    Manager = 0,
    Applicant = 1,
    Personnel = 2,
    Advertiser = 3,
  }
}
