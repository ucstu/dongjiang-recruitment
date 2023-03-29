import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Authority } from "src/authority/entities/authority.entity";

/**
 * AuthorityGroup
 */
@Entity()
export class AuthorityGroup {
  /**
   * 权限列表
   */
  @ManyToMany(() => Authority, {
    eager: true,
  })
  @JoinTable()
  authorities: Authority[];
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
   * 权限组ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
  /**
   * 名称
   */
  @Column()
  name: string;
  /**
   * 修改时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}
