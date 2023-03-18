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
import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";
import { Position } from "./entities/position.entity";
import { PositionService } from "./position.service";

@Controller("companies/{companyId}/positions")
export class PositionController {
  constructor(private readonly positionService: PositionService) {}

  @Post()
  create(
    @Param("companyId") companyId: string,
    @Body() createPositionDto: CreatePositionDto
  ) {
    return this.positionService.create(companyId, createPositionDto);
  }

  @Get()
  findAll(
    @Param("companyId") companyId: string,
    @QueryParam() query: Array<FindOptionsWhere<Position>>,
    @Page() page: Pagination<Position>
  ) {
    return this.positionService.findAll(companyId, query, page);
  }

  @Get(":id")
  findOne(@Param("companyId") companyId: string, @Param("id") id: string) {
    return this.positionService.findOne(companyId, id);
  }

  @Put(":id")
  update(
    @Param("companyId") companyId: string,
    @Param("id") id: string,
    @Body() updatePositionDto: UpdatePositionDto
  ) {
    return this.positionService.update(companyId, id, updatePositionDto);
  }

  @Delete(":id")
  remove(@Param("companyId") companyId: string, @Param("id") id: string) {
    return this.positionService.remove(companyId, id);
  }
}
