import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateGarnerRecordDto } from "./dto/create-garnerRecord.dto";
import { UpdateGarnerRecordDto } from "./dto/update-garnerRecord.dto";
import { GarnerRecord } from "./entities/garnerRecord.entity";

@Injectable()
export class GarnerRecordService {
  constructor(
    @InjectRepository(GarnerRecord)
    private readonly garnerRecordRepository: Repository<GarnerRecord>
  ) {}

  async create(applicantId: string, createGarnerRecordDto: CreateGarnerRecordDto) {
    return await this.garnerRecordRepository.save({
      ...createGarnerRecordDto,
      applicantId,
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<GarnerRecord>>,
    { page, size, sort }: Pagination<GarnerRecord>
  ) {
    return {
      total: await this.garnerRecordRepository.count({
        where: query.map((q) => ({ ...q, applicantId })),
      }),
      items: await this.garnerRecordRepository.find({
        where: { ...query, applicantId },
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(applicantId: string, id: string) {
    const garnerRecord = await this.garnerRecordRepository.findOne({
      where: { applicantId, id },
    });
    if (!garnerRecord) throw new NotFoundException();
    return garnerRecord;
  }

  async update(applicantId: string, id: string, updateGarnerRecordDto: UpdateGarnerRecordDto) {
    const garnerRecord = { ...updateGarnerRecordDto, applicantId, id };
    const { affected } = await this.garnerRecordRepository.update(id, garnerRecord);
    if (!affected) throw new NotFoundException();
    return garnerRecord;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.garnerRecordRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
