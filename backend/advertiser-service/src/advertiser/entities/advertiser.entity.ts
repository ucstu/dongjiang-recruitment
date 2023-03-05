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
 * AdvertiserInformation
 */
@Entity()
export class AdvertiserInformation {
  /**
   * 广告商信息ID
   */
  @PrimaryGeneratedColumn("uuid")
  advertiserInformationId: string;
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
   * Logo地址
   */
  @Column()
  @IsNotEmpty()
  logoUrl: string;
  /**
   * 广告商名称
   */
  @Column()
  @IsNotEmpty()
  name: string;
  /**
   * 网页地址
   */
  @Column()
  @IsNotEmpty()
  pageUrl: string;
}
