import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

/**
 * 公司地点
 */
export class Location {
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
}

/**
 * Company
 */
@Entity()
export class Company {
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
   * 扩展
   */
  @Column()
  about: string;
  /**
   * 详细地址
   */
  @Column()
  address: string;
  /**
   * 公司福利
   */
  @Column("simple-array")
  benefits: string[];
  /**
   * 所在城市
   */
  @Column()
  cityName: string;
  /**
   * 公司名称
   */
  @Column()
  companyName: string;
  /**
   * 领域名称
   */
  @Column()
  comprehensionName: string;
  /**
   * 成立时间
   */
  @Column()
  establishmentTime: string;
  /**
   * 融资阶段，{1:未融资,2:天使轮,3:A轮,4:B轮,5:C轮,6:D轮及以上,7:上市公司,8:不需要融资}
   */
  @Column()
  financingStage: number;
  /**
   * 公司全称
   */
  @Column()
  fullName: string;
  /**
   * 法定代表人
   */
  @Column()
  legalRepresentative: string;
  /**
   * 公司地点
   */
  @Column("simple-json")
  location: Location;
  /**
   * LOGO地址
   */
  @Column()
  logoUrl: string;
  /**
   * 机构类型
   */
  @Column()
  organizationType: string;
  /**
   * 在招职位
   */
  @Column()
  recruitmentPosition: number;
  /**
   * 注册资本
   */
  @Column()
  registeredCapital: string;
  /**
   * 公司规模，{1:少于15人,2:15-50人,3:50-150人,4:150-500人,5:500-2000人,6:2000以上}
   */
  @Column()
  scale: number;
}
