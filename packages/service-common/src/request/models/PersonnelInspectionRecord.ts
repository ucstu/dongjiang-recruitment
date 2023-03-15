/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 人事查看记录
 */
export type PersonnelInspectionRecord = {
  /**
   * 人事查看记录ID
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
   * 人事ID
   */
  personnelId: string;
  /**
   * 求职者ID
   */
  applicantId: string;
};
