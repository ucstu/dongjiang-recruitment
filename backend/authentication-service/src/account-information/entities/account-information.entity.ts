import { Exclude } from "@dongjiang-recruitment/nest-common/dist/transform";
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { IsNotEmpty } from "@dongjiang-recruitment/nest-common/dist/validation";

/**
 * AccountInformation
 */
@Entity()
export class AccountInformation {
  /**
   * 账号信息ID
   */
  @PrimaryGeneratedColumn("uuid")
  accountInformationId: string;
  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 删除时间
   */
  @DeleteDateColumn()
  deletedAt?: Date;
  /**
   * 详细信息ID
   */
  @Column("simple-json")
  fullInformationId: FullInformationId;
  /**
   * 用户名
   */
  @Column()
  @IsNotEmpty()
  userName: string;
  /**
   * 密码
   */
  @Column()
  @Exclude()
  @IsNotEmpty()
  password: string;
}

/**
 * 详细信息ID
 */
export interface FullInformationId {
  /**
   * 广告商信息
   */
  advertiser: string;
  /**
   * 求职者信息
   */
  applicant: string;
  /**
   * 管理员信息
   */
  manager: string;
  /**
   * 人事信息
   */
  personnel: string;
}

export namespace AccountInformation {
  export enum AccountType {
    Manager = 0,
    Applicant = 1,
    Personnel = 2,
    Advertiser = 3,
  }
}
