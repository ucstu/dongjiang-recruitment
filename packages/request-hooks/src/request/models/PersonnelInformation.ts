/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 人事信息
 */
export type PersonnelInformation = {
  /**
   * 人事信息ID
   */
  personnelInformationId: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updatedAt: string;
  /**
   * 公司信息ID
   */
  companyInformationId: string;
  /**
   * 头像地址
   */
  avatarUrl: string;
  /**
   * HR姓名
   */
  hrName: string;
  /**
   * 职位名称
   */
  postName: string;
  /**
   * 电子邮箱
   */
  acceptEmail: string;
};
