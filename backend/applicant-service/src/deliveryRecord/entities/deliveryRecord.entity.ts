import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * DeliveryRecord
 */
@Entity()
export class DeliveryRecord {
  /**
   * ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
  /**
   * 移除时间
   */
  @DeleteDateColumn()
  deletedAt: Date;
  /**
   * 求职者ID
   */
  @Column()
  applicantId: string;
  /**
   * 公司ID
   */
  @Column()
  companyId: string;
  /**
   * 面试时间
   */
  @Column()
  interviewTime: Date;
  /**
   * 职位ID
   */
  @Column()
  positionId: string;
  /**
   * 投递状态，{1:待查看,2:已查看,3:通过筛选,4:约面试,5:不合适}
   */
  @Column()
  status: number;
}
