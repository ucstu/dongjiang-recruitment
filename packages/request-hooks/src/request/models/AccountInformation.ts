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
   * 用户名
   */
  userName: string;
  /**
   * 详细信息ID
   */
  fullInformationId: {
    /**
     * 管理员信息
     */
    manager: string;
    /**
     * 求职者信息
     */
    applicant: string;
    /**
     * 人事信息
     */
    personnel: string;
    /**
     * 广告商信息
     */
    advertiser: string;
  };
};
