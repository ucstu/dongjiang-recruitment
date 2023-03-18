import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company)
    private readonly companyRepository: Repository<Company>
  ) {}

  async create(createCompanyDto: CreateCompanyDto) {
    return await this.companyRepository.save(createCompanyDto);
  }

  async findAll(
    query: Array<FindOptionsWhere<Company>>,
    { page, size, sort }: Pagination<Company>
  ) {
    return {
      total: await this.companyRepository.count({
        where: query,
      }),
      items: await this.companyRepository.find({
        where: query,
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(id: string) {
    const company = await this.companyRepository.findOne({
      where: { id },
    });
    if (!company) throw new NotFoundException();
    return company;
  }

  async update(id: string, updateCompanyDto: UpdateCompanyDto) {
    const company = {
      ...updateCompanyDto,
      id,
    };
    const { affected } = await this.companyRepository.update(id, company);
    if (!affected) throw new NotFoundException();
    return company;
  }

  async remove(id: string) {
    const { affected } = await this.companyRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
