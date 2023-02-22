import { HttpService } from "@dongjiang-recruitment/nest-common/dist/http";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import {
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { BadRequestException, Injectable } from "@nestjs/common";
import { CreateAccountInformationDto } from "./dto/create-account-information.dto";
import { UpdateAccountInformationDto } from "./dto/update-account-information.dto";
import {
  AccountInformation,
  FullInformationId,
} from "./entities/account-information.entity";

import * as bcrypt from "bcrypt";

const ACCOUNT_TYPE_URL_MAP = {
  [CreateAccountInformationDto.AccountType.Advertiser]: "advertisers",
  [CreateAccountInformationDto.AccountType.Applicant]: "userInfos",
  [CreateAccountInformationDto.AccountType.Manager]: "",
  [CreateAccountInformationDto.AccountType.Personnel]: "hrInfos",
};

const STATIC_FULL_INFORMATION_ID = {
  advertiser: null,
  applicant: null,
  manager: null,
  personnel: null,
};

@Injectable()
export class AccountInformationService {
  private readonly redis: Redis;

  constructor(
    @InjectRepository(AccountInformation)
    private readonly accountInformationRepository: Repository<AccountInformation>,
    private readonly httpService: HttpService,
    private readonly redisService: RedisService
  ) {
    this.redis = this.redisService.getClient();
  }

  async create(createAccountInformationDto: CreateAccountInformationDto) {
    const { accountType, password, userName, verificationCode } =
      createAccountInformationDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    // 获取账号类型对应的字段名
    const accountTypeStr = CreateAccountInformationDto.AccountType[
      accountType
    ].toLowerCase() as keyof FullInformationId;

    // 检查账号是否已存在
    const account = await this.accountInformationRepository.findOne({
      where: {
        userName,
      },
    });
    if (account?.fullInformationId[accountTypeStr])
      throw new BadRequestException("账号已存在");

    // 创建账号详细信息
    // const { data } = await firstValueFrom(
    //   this.httpService.post<{
    //     [key in keyof FullInformationId as `${key}InformationId`]: string;
    //   }>(
    //     `http://${accountTypeStr}-service/${ACCOUNT_TYPE_URL_MAP[accountType]}`,
    //     {}
    //   )
    // );

    // 加密密码
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // 创建账号
    return await this.accountInformationRepository.save({
      ...account,
      userName,
      password: hashedPassword,
      fullInformationId: {
        ...STATIC_FULL_INFORMATION_ID,
        ...account?.fullInformationId,
        // [accountTypeStr]: data[`${accountTypeStr}InformationId`]
        [accountTypeStr]: "1234567890",
      },
    });
  }

  findAll() {
    return `This action returns all accountInformation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accountInformation`;
  }

  update(id: number, updateAccountInformationDto: UpdateAccountInformationDto) {
    return `This action updates a #${id} accountInformation`;
  }

  remove(id: number) {
    return `This action removes a #${id} accountInformation`;
  }
}
