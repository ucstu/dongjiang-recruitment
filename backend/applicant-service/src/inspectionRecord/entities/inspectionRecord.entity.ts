import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * InspectionRecord
 */
@Entity("applicant_inspection_record")
export class InspectionRecord {
  /**
   * 求职者查看记录ID
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
  /**
   * 职位ID
   */
  @Column({
    nullable: true,
  })
  positionId: string;
}
