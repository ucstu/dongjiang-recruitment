import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

export enum PositionPosition {
  /**
   * 主页
   */
  Master = 1,
}
export enum PositionStatus {
  /**
   * 活动中
   */
  Active = 1,
  /**
   * 已过期
   */
  Expired = 2,
}

/**
 * Position
 */
@Entity()
export class Position {
  /**
   * 图片地址
   */
  @Column()
  banner: string;
  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 移除时间
   */
  @DeleteDateColumn()
  deletedAt: Date;
  /**
   * 结束时间
   */
  @Column()
  endTime: Date;
  /**
   * 广告ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 名称
   */
  @Column()
  name: string;
  /**
   * 网页地址
   */
  @Column()
  pageUrl: string;
  /**
   * 已缴费用
   */
  @Column()
  payed: number;
  /**
   * 投放位置，{1:Master}
   */
  @Column({
    type: "enum",
    enum: PositionPosition,
  })
  position: PositionPosition;
  /**
   * 开始时间
   */
  @Column()
  startTime: Date;
  /**
   * 投放状态，{1:Active,2:Expired}
   */
  @Column({
    type: "enum",
    enum: PositionStatus,
  })
  status: PositionStatus;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 广告商ID
   */
  @Column()
  companyId: string;
}
