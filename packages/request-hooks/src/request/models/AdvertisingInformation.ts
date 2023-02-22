/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 广告信息
 */
export type AdvertisingInformation = {
  /**
   * 广告信息ID
   */
  advertisingInformationId: string;
  /**
   * 创建时间
   */
  createdAt: string;
  /**
   * 修改时间
   */
  updatedAt: string;
  /**
   * 广告名称
   */
  name: string;
  /**
   * 网页地址
   */
  pageUrl: string;
  /**
   * 图片地址
   */
  banner: string;
  /**
   * {1:Master}
   */
  position: AdvertisingInformation.position;
  /**
   * {1:Active,2:Expired}
   */
  status: AdvertisingInformation.status;
  /**
   * 已缴费用
   */
  payed: AdvertisingInformation.payed;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
};

export namespace AdvertisingInformation {
  /**
   * {1:Master}
   */
  export enum position {
    Master = 1,
  }

  /**
   * {1:Active,2:Expired}
   */
  export enum status {
    Active = 1,
    Inactive = 2,
  }

  /**
   * 已缴费用
   */
  export enum payed {
    Active = 1,
    Expired = 2,
  }
}
