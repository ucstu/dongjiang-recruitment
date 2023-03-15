export enum AccountType {
  /**
   * 管理员
   */
  Manager = 0,
  /**
   * 求职者
   */
  Applicant = 1,
  /**
   * 人事
   */
  Personnel = 2,
  /**
   * 广告商
   */
  Advertiser = 3,
}

export class CreateAccountDto {
  /**
   * 账号类型
   */
  accountType: number;
  /**
   * 详情ID
   */
  detailId: string;
  /**
   * 用户名
   */
  userName: string;
  /**
   * 密码
   */
  password: string;
}
