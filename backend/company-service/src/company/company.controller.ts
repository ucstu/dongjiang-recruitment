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
import { Position } from "src/position/entities/position.entity";
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

  @Get("positions")
  findAllPositions(
    @QueryParam() query: Array<FindOptionsWhere<Position>>,
    @Page() page: Pagination<Position>
  ) {
    return this.companyService.findAllPositions(query, page);
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

  @Get("bigData")
  getBigData(
    @QueryParam() query: Array<FindOptionsWhere<Company>>,
    @Page() page: Pagination<Company>
  ) {
    return [
      {
        date: "2010-04-19",
        inspectionRecordCount: 89,
        deliveryRecordCount: 70,
        onlineCommunicateCount: 80,
      },
      {
        date: "2005-01-06",
        inspectionRecordCount: 92,
        deliveryRecordCount: 94,
        onlineCommunicateCount: 91,
      },
      {
        date: "2007-09-15",
        inspectionRecordCount: 98,
        deliveryRecordCount: 90,
        onlineCommunicateCount: 81,
      },
      {
        date: "1972-10-21",
        inspectionRecordCount: 61,
        deliveryRecordCount: 93,
        onlineCommunicateCount: 76,
      },
      {
        date: "1989-05-20",
        inspectionRecordCount: 96,
        deliveryRecordCount: 76,
        onlineCommunicateCount: 67,
      },
    ];
  }
}
