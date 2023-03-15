import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AccountType, CreateAccountDto } from "./dto/create-account.dto";
import { UpdateAccountDto } from "./dto/update-account.dto";
import { Account } from "./entities/account.entity";

const hashPassword = (password: string) => {
  const salt = bcrypt.genSaltSync();
  return bcrypt.hashSync(password, salt);
};

const STATIC_FULL_ID = {
  manager: null,
  applicant: null,
  personnel: null,
  account: null,
};

@Injectable()
export class AccountService {
  constructor(
    @InjectRepository(Account)
    private readonly accountRepository: Repository<Account>
  ) {}

  async create(createAccountDto: CreateAccountDto) {
    const { accountType, userName, password, detailId } = createAccountDto;

    // 获取账号类型对应的字段名
    const accountTypeStr = AccountType[
      accountType
    ].toLowerCase() as keyof typeof STATIC_FULL_ID;

    // 检查账号是否已存在
    const account = await this.accountRepository.findOne({
      where: {
        userName,
      },
    });
    if (account?.detailId[accountTypeStr]) {
      throw new BadRequestException("账号已存在");
    }

    // 创建账号
    return await this.accountRepository.save({
      ...account,
      userName,
      password: hashPassword(password),
      groups: [...(account?.groups || []), accountTypeStr],
      detailId: {
        ...STATIC_FULL_ID,
        ...account?.detailId,
        [accountTypeStr]: detailId,
      },
    });
  }

  async findAll(
    query: Array<FindOptionsWhere<Account>>,
    { page, size, sort }: Pagination<Account>
  ) {
    return {
      total: await this.accountRepository.count({
        where: query,
      }),
      items: await this.accountRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const account = await this.accountRepository.findOne({
      where: { id },
    });
    if (!account) throw new NotFoundException();
    return account;
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    const account: UpdateAccountDto = {
      ...updateAccountDto,
      password: hashPassword(updateAccountDto.password),
      id,
    };
    const { affected } = await this.accountRepository.update(id, account);
    if (!affected) throw new NotFoundException();
    return account;
  }

  async remove(id: string) {
    const { affected } = await this.accountRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
