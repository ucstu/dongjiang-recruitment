import {
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Applicant } from "src/applicant/entities/applicant.entity";
import { Company } from "src/external.entity";

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
   * 求职者
   */
  @OneToOne(() => Applicant, (applicant) => applicant.id, {
    eager: true,
  })
  @JoinColumn()
  applicant: Applicant;
  /**
   * 公司
   */
  @OneToOne(() => Company, (company) => company.id, {
    eager: true,
  })
  @JoinColumn()
  company: Company;
}
