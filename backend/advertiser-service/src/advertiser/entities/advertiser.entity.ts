import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { IsNotEmpty } from "@dongjiang-recruitment/nest-common/dist/validation";

/**
 * AdvertiserInformation
 */
@Entity()
export class AdvertiserInformation {
  /**
   * 广告信息ID
   */
  @PrimaryGeneratedColumn()
  advertiserInformationId: string;
  /**
   * 图片地址
   */
  @IsNotEmpty()
  @Column()
  banner: string;
  /**
   * 结束时间
   */
  @IsNotEmpty()
  @Column()
  endTime: string;
  /**
   * 广告名称
   */
  @IsNotEmpty()
  @Column()
  name: string;
  /**
   * 网页地址
   */
  @IsNotEmpty()
  @Column()
  pageUrl: string;
  /**
   * 已缴费用
   */
  @Column()
  payed: number;
  /**
   * 投放位置
   */
  @IsNotEmpty()
  @Column()
  position: number;
  /**
   * 开始时间
   */
  @IsNotEmpty()
  @Column()
  startTime: string;
  /**
   * 投放状态
   */
  @IsNotEmpty()
  @Column()
  status: number;
}
