/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 收藏记录
 */
export type GarnerRecord = {
  /**
   * 收藏记录ID
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
  /**
   * 职位ID
   */
  positionId: string;
};
