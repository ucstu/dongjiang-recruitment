import { JwtService } from "@dongjiang-recruitment/nest-common/dist/auth";
import {
  Applicant,
  ServiceClient,
} from "@dongjiang-recruitment/nest-common/dist/http";
import {
  Redis,
  RedisService,
} from "@dongjiang-recruitment/nest-common/dist/redis";
import { BadRequestException, Injectable } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AccountService } from "src/account/account.service";
import { ChangePasswordActionDto } from "./dto/change-password-action.dto";
import { ForgetPasswordActionDto } from "./dto/forget-password-action.dto";
import { LoginActionDto } from "./dto/login-action.dto";
import { AccountType, RegisterActionDto } from "./dto/register-action.dto";

const STATIC_FULL_ID = {
  manager: null,
  applicant: null,
  personnel: null,
  advertiser: null,
};

@Injectable()
export class ActionsService {
  private readonly redis: Redis;

  constructor(
    private readonly accountService: AccountService,
    private readonly redisService: RedisService,
    private readonly jwtService: JwtService,
    private readonly serviceClient: ServiceClient
  ) {
    this.redis = this.redisService.getClient();
  }

  async register(createAccountDto: RegisterActionDto) {
    const { accountType, password, userName, verificationCode } =
      createAccountDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    // 获取账号类型对应的字段名
    const accountTypeStr = AccountType[
      accountType
    ].toLowerCase() as keyof typeof STATIC_FULL_ID;

    // 检查账号是否已存在
    const { items: accounts } = await this.accountService.findAll(
      [
        {
          userName,
        },
      ],
      { page: 0, size: 1, sort: {} }
    );
    if (accounts[0]?.detailId[accountTypeStr]) {
      throw new BadRequestException("账号已存在");
    }

    await this.serviceClient.loginAsAdmin();
    let detailId: string;
    // 创建账号详细信息
    switch (accountType) {
      case AccountType.Manager:
        detailId = "manager";
        break;
      case AccountType.Applicant:
        detailId = (
          await this.serviceClient.applicant.addApplicant({
            requestBody: {
              age: 0,
              avatarUrl: "",
              cityName: "",
              dateOfBirth: "",
              education: Applicant.education.Unknown,
              email: "",
              firstName: "",
              jobStatus: Applicant.jobStatus.Unknown,
              lastName: "",
              personalAdvantage: "",
              pictureWorks: [],
              privacySettings: Applicant.privacySettings.Anonymous,
              sex: "",
              socialHomepage: "",
              workingYears: Applicant.workingYears.InSchoolOrFreshGraduate,
            },
          })
        ).body.id;
        break;
      case AccountType.Personnel:
        detailId = (
          await this.serviceClient.personnel.addPersonnel({
            requestBody: {
              acceptEmail: "",
              avatarUrl: "",
              companyId: "",
              hrName: "",
              postName: "",
            },
          })
        ).body.id;
        break;
      case AccountType.Advertiser:
        detailId = (
          await this.serviceClient.advertiser.addAdvertiser({
            requestBody: {
              logoUrl: "",
              name: "",
              pageUrl: "",
            },
          })
        ).body.id;
        break;
    }

    // 创建账号
    return await this.accountService.create({
      accountType,
      detailId,
      password,
      userName,
    });
  }

  async destroy(id: string, verificationCode: string) {
    // 检查账号是否存在
    const account = await this.accountService.findOne(id);
    if (!account) throw new BadRequestException("账号不存在");

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${account.userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    return await this.accountService.remove(id);
  }

  async login(loginActionDto: LoginActionDto) {
    const { password, userName } = loginActionDto;

    // 检查账号是否存在
    const { items: accounts } = await this.accountService.findAll(
      [
        {
          userName,
        },
      ],
      { page: 0, size: 1, sort: {} }
    );
    if (!accounts[0]) throw new BadRequestException("账号不存在");

    // 检查密码是否正确
    if (bcrypt.compareSync(password, accounts[0].password)) {
      throw new BadRequestException("密码错误");
    }

    return {
      token: this.jwtService.sign(accounts[0]),
      account: accounts[0],
    };
  }

  async changePassword(
    id: string,
    changePasswordActionDto: ChangePasswordActionDto
  ) {
    const account = await this.accountService.findOne(id);
    if (!account) throw new BadRequestException("账号不存在");

    const { password, verificationCode } = changePasswordActionDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${account.userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    return await this.accountService.update(id, { ...account, password });
  }

  async forgetPassword(forgetPasswordActionDto: ForgetPasswordActionDto) {
    const { password, userName, verificationCode } = forgetPasswordActionDto;

    // 检查验证码是否正确
    const trueVerificationCode = await this.redis.get(
      `verification-code:${userName}`
    );
    if (trueVerificationCode !== verificationCode) {
      throw new BadRequestException("验证码错误");
    }

    // 检查账号是否存在
    const { items: accounts } = await this.accountService.findAll(
      [
        {
          userName,
        },
      ],
      { page: 0, size: 1, sort: {} }
    );
    if (!accounts[0]) throw new BadRequestException("账号不存在");

    return await this.accountService.update(accounts[0].id, {
      ...accounts[0],
      password,
    });
  }
}
