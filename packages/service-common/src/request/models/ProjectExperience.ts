/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 项目经历
 */
export type ProjectExperience = {
  /**
   * 项目经历ID
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
   * 项目名称
   */
  projectName: string;
  /**
   * 项目描述
   */
  projectDescription: string;
  /**
   * 我的成就
   */
  achievement: string;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
  /**
   * 项目链接
   */
  projectLink: string;
};
