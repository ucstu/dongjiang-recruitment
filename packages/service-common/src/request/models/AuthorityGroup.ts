/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 权限组
 */
export type AuthorityGroup = {
  /**
   * 权限组ID
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
   * 权限列表
   */
  authorities: Array<string>;
};
