/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 广告商
 */
export type Advertiser = {
  /**
   * 广告商ID
   */
  id: string;
  /**
   * 创建时间
   */
  createdAt: Date;
  /**
   * 修改时间
   */
  updatedAt: Date;
  /**
   * 移除时间
   */
  deletedAt: Date;
  /**
   * 名称
   */
  name: string;
  /**
   * 网页地址
   */
  pageUrl: string;
  /**
   * Logo地址
   */
  logoUrl: string;
};
