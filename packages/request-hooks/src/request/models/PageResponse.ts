/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

/**
 * 分页响应
 */
export type PageResponse = {
  /**
   * 请求ID
   */
  requestId?: string;
  /**
   * 响应时间
   */
  timestamp: string;
  /**
   * 响应编码
   */
  status: number;
  /**
   * 响应信息
   */
  message: string;
  /**
   * 响应体
   */
  body: {
    /**
     * 记录总数
     */
    totalCount: number;
    /**
     * 当页内容
     */
    items: Array<string>;
  };
};
