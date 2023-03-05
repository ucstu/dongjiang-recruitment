import { IsNotEmpty } from "@dongjiang-recruitment/nest-common/dist/validation";

export class CreateAccountInformationDto {
  /**
   * 账号类型，{0:Manager,1:Applicant,2:Personnel,3:Advertiser}
   */
  @IsNotEmpty()
  accountType: CreateAccountInformationDto.AccountType;
  /**
   * 密码
   */
  @IsNotEmpty()
  password: string;
  /**
   * 用户名
   */
  @IsNotEmpty()
  userName: string;
  /**
   * 短信验证码
   */
  @IsNotEmpty()
  verificationCode: string;
}

export namespace CreateAccountInformationDto {
  export enum AccountType {
    Manager = 0,
    Applicant = 1,
    Personnel = 2,
    Advertiser = 3,
  }
}
