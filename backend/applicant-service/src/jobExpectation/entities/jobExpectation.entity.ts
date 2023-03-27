import {
Column,
CreateDateColumn,
DeleteDateColumn,
Entity,
PrimaryGeneratedColumn,
UpdateDateColumn
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * JobExpectation
 */
@Entity()
export class JobExpectation {
  /**
   * 求职期望ID
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
   * 上限薪资，单位K
   */
  @Column()
  ceilingSalary: number;
  /**
   * 期望城市
   */
  @Column()
  cityName: string;
  /**
   * 细分标签
   */
  @Column("simple-array")
  directionTags: string[];
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
   * 起始薪资，单位K
   */
  @Column()
  startingSalary: number;
  /**
   * 求职者ID
   */
  @Column()
  applicantId: string;
}
