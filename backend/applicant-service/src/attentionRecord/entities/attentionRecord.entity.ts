import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * AttentionRecord
 */
@Entity()
export class AttentionRecord {
  /**
   * 关注记录ID
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
  @Column({
    nullable: true,
  })
  applicantId: string;
  /**
   * 公司ID
   */
  @Column({
    nullable: true,
  })
  companyId: string;
}
