import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";

export enum CompanyFinancingStage {
  NoFinanced = 1,
  AngelWheel = 2,
  ARound = 3,
  BRound = 4,
  CRound = 5,
  DAndMoreRound = 6,
  ListedCompany = 7,
  NoRequired = 8,
}

export enum CompanyScale {
  LessThan15People = 1,
  With15To50People = 2,
  With50To150People = 3,
  With150To500People = 4,
  With500To2000People = 5,
  MoreThen2000People = 6,
}

/**
 * 公司
 */
@Entity()
export class Company {
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
   * 创建时间
   */
  @CreateDateColumn()
  createdAt: Date;
  /**
   * 移除时间
   */
  @DeleteDateColumn()
  deletedAt: null | Date;
  /**
   * 成立时间
   */
  @Column()
  establishmentTime: Date;
  /**
   * 融资阶段，{1:未融资,2:天使轮,3:A轮,4:B轮,5:C轮,6:D轮及以上,7:上市公司,8:不需要融资}
   */
  @Column({
    type: "enum",
    enum: CompanyFinancingStage,
  })
  financingStage: CompanyFinancingStage;
  /**
   * 公司全称
   */
  @Column()
  fullName: string;
  /**
   * 公司ID
   */
  @PrimaryGeneratedColumn("uuid")
  id: string;
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
  @Column({
    type: "enum",
    enum: CompanyScale,
  })
  scale: number;
  /**
   * 更新时间
   */
  @UpdateDateColumn()
  updatedAt: Date;
}

/**
 * 公司地点
 */
export interface Location {
  /**
   * 纬度
   */
  latitude: number;
  /**
   * 经度
   */
  longitude: number;
}
