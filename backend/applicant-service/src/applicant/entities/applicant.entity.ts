import {
Column,
CreateDateColumn,
DeleteDateColumn,
Entity,
PrimaryGeneratedColumn,
UpdateDateColumn
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * Applicant
 */
@Entity()
export class Applicant {
  /**
   * 求职者ID
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
   * 年龄
   */
  @Column()
  age: number;
  /**
   * 头像地址
   */
  @Column()
  avatarUrl: string;
  /**
   * 所在城市
   */
  @Column()
  cityName: string;
  /**
   * 生日
   */
  @Column()
  dateOfBirth: string;
  /**
   * 学历状态，{0:未知,1:大专,2:本科,3:硕士,4:博士}
   */
  @Column()
  education: number;
  /**
   * 电子邮箱
   */
  @Column()
  email: string;
  /**
   * 姓
   */
  @Column()
  firstName: string;
  /**
   * 求职状态，{1:随时入职,2:2周内入职,3:1月内入职}
   */
  @Column()
  jobStatus: number;
  /**
   * 名
   */
  @Column()
  lastName: string;
  /**
   * 个人优势
   */
  @Column()
  personalAdvantage: string;
  /**
   * 图片作品
   */
  @Column("simple-array")
  pictureWorks: string[];
  /**
   * 隐私设置，{1:实名,2:匿名}
   */
  @Column()
  privacySettings: number;
  /**
   * 性别
   */
  @Column()
  sex: string;
  /**
   * 社交主页
   */
  @Column()
  socialHomepage: string;
  /**
   * 工作年限，{1:没有工作经验,2:在校/应届,3:3年一下,4:3-5年,5:5-10年,6:10年以上}
   */
  @Column()
  workingYears: number;
}
