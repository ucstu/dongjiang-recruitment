import {
  Page,
  Pagination,
  QueryParam,
} from "@dongjiang-recruitment/nest-common/dist/decorator";
import { FindOptionsWhere } from "@dongjiang-recruitment/nest-common/dist/typeorm";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { CompanyService } from "./company.service";
import { CreateCompanyDto } from "./dto/create-company.dto";
import { UpdateCompanyDto } from "./dto/update-company.dto";
import { Company } from "./entities/company.entity";

@Controller("companies")
export class CompanyController {
  constructor(private readonly companyService: CompanyService) {}

  @Post()
  create(@Body() createCompanyDto: CreateCompanyDto) {
    return this.companyService.create(createCompanyDto);
  }

  @Get()
  findAll(
    @QueryParam() query: Array<FindOptionsWhere<Company>>,
    @Page() page: Pagination<Company>
  ) {
    return this.companyService.findAll(query, page);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.companyService.findOne(id);
  }

  @Put(":id")
  update(@Param("id") id: string, @Body() updateCompanyDto: UpdateCompanyDto) {
    return this.companyService.update(id, updateCompanyDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.companyService.remove(id);
  }
}
