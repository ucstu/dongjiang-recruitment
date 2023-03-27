import {
Column,
CreateDateColumn,
DeleteDateColumn,
Entity,
PrimaryGeneratedColumn,
UpdateDateColumn
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * Personnel
 */
@Entity()
export class Personnel {
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
   * 电子邮箱
   */
  @Column()
  acceptEmail: string;
  /**
   * 头像地址
   */
  @Column()
  avatarUrl: string;
  /**
   * 公司ID
   */
  @Column()
  companyId: string;
  /**
   * 人事姓名
   */
  @Column()
  hrName: string;
  /**
   * 职位名称
   */
  @Column()
  postName: string;
}
