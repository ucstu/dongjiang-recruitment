import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * ProjectExperience
 */
@Entity()
export class ProjectExperience {
  /**
   * 项目经历ID
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
   * 我的成就
   */
  @Column()
  achievement: string;
  /**
   * 结束时间
   */
  @Column()
  endTime: string;
  /**
   * 项目描述
   */
  @Column()
  projectDescription: string;
  /**
   * 项目链接
   */
  @Column()
  projectLink: string;
  /**
   * 项目名称
   */
  @Column()
  projectName: string;
  /**
   * 开始时间
   */
  @Column()
  startTime: string;
  /**
   * 求职者ID
   */
  @Column()
  applicantId: string;
}
