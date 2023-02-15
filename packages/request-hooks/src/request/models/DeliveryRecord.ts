/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 投递记录
 */
export type DeliveryRecord = {
  /**
   * 投递记录ID
   */
  deliveryRecordId: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 更新时间
   */
  updated: string;
  /**
   * 用户信息ID
   */
  userInformationIdinterview: string;
  /**
   * {1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
   */
  status: DeliveryRecord.status;
  /**
   * 面试时间
   */
  interviewTime: string;
  /**
   * 公司信息ID
   */
  companyInformationId: string;
  /**
   * 职位信息ID
   */
  positionInformationId: string;
};

export namespace DeliveryRecord {
  /**
   * {1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
   */
  export enum status {
    Unviewed = 1,
    Viewed = 2,
    PassFilter = 3,
    Interview = 4,
    Inappropriate = 5,
  }
}
