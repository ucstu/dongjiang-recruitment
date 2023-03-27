import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * WorkExperience
 */
@Entity()
export class WorkExperience {
  /**
   * 工作经历ID
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
   * 公司领域
   */
  @Column()
  companyIndustry: string;
  /**
   * 公司名称
   */
  @Column()
  companyName: string;
  /**
   * 部门名称
   */
  @Column()
  departmentName: string;
  /**
   * 离职时间
   */
  @Column()
  endTime: string;
  /**
   * 工作内容
   */
  @Column()
  jobContent: string;
  /**
   * 职位名称
   */
  @Column()
  positionName: string;
  /**
   * 职位类型，{1:全职,2:兼职,3:实习}
   */
  @Column()
  positionType: number;
  /**
   * 就职时间
   */
  @Column()
  startTime: string;
  /**
   * 求职者ID
   */
  @Column()
  applicantId: string;
}
