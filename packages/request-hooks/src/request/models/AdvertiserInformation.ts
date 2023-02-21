/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 广告信息
 */
export type AdvertiserInformation = {
  /**
   * 广告信息ID
   */
  advertiserInformationId: string;
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
   * 投放位置
   */
  position: AdvertiserInformation.position;
  /**
   * 投放状态
   */
  status: AdvertiserInformation.status;
  /**
   * 已缴费用
   */
  payed: number;
  /**
   * 开始时间
   */
  startTime: string;
  /**
   * 结束时间
   */
  endTime: string;
};

export namespace AdvertiserInformation {
  /**
   * 投放位置
   */
  export enum position {
    Master = 1,
  }

  /**
   * 投放状态
   */
  export enum status {
    Active = 1,
    Inactive = 2,
  }
}
