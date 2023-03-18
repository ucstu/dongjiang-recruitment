import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreatePositionDto } from "./dto/create-position.dto";
import { UpdatePositionDto } from "./dto/update-position.dto";
import { Position } from "./entities/position.entity";

@Injectable()
export class PositionService {
  constructor(
    @InjectRepository(Position)
    private readonly positionRepository: Repository<Position>
  ) {}

  async create(companyId: string, createPositionDto: CreatePositionDto) {
    return await this.positionRepository.save({
      ...createPositionDto,
      companyId,
    });
  }

  async findAll(
    companyId: string,
    query: Array<FindOptionsWhere<Position>>,
    { page, size, sort }: Pagination<Position>
  ) {
    return {
      total: await this.positionRepository.count({
        where: query.map((q) => ({ ...q, companyId })),
      }),
      items: await this.positionRepository.find({
        where: { ...query, companyId },
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(companyId: string, id: string) {
    const position = await this.positionRepository.findOne({
      where: { companyId, id },
    });
    if (!position) throw new NotFoundException();
    return position;
  }

  async update(
    companyId: string,
    id: string,
    updatePositionDto: UpdatePositionDto
  ) {
    const position = { ...updatePositionDto, companyId, id };
    const { affected } = await this.positionRepository.update(id, position);
    if (!affected) throw new NotFoundException();
    return position;
  }

  async remove(companyId: string, id: string) {
    const { affected } = await this.positionRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
