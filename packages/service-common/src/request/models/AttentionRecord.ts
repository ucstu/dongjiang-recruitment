/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 关注记录
 */
export type AttentionRecord = {
  /**
   * 关注记录ID
   */
  id: string;
  /**
   * 创建时间
   */
  createdAt: Date;
  /**
   * 更新时间
   */
  updatedAt: Date;
  /**
   * 移除时间
   */
  deletedAt: Date;
  /**
   * 求职者ID
   */
  applicantId: string;
  /**
   * 公司ID
   */
  companyId: string;
};
