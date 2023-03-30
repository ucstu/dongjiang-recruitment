import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateInspectionRecordDto } from "./dto/create-inspectionRecord.dto";
import { UpdateInspectionRecordDto } from "./dto/update-inspectionRecord.dto";
import { InspectionRecord } from "./entities/inspectionRecord.entity";

@Injectable()
export class InspectionRecordService {
  constructor(
    @InjectRepository(InspectionRecord)
    private readonly inspectionRecordRepository: Repository<InspectionRecord>
  ) {}

  async create(
    applicantId: string,
    createInspectionRecordDto: CreateInspectionRecordDto
  ) {
    return await this.inspectionRecordRepository.save({
      ...createInspectionRecordDto,
      applicantId,
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<InspectionRecord>>,
    { page, size, sort }: Pagination<InspectionRecord>
  ) {
    return {
      total: await this.inspectionRecordRepository.count({
        where: query.map((q) => ({ ...q, applicantId })),
      }),
      items: await this.inspectionRecordRepository.find({
        where: query.map((q) => ({ ...q, applicantId })),
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(applicantId: string, id: string) {
    const inspectionRecord = await this.inspectionRecordRepository.findOne({
      where: { applicantId, id },
    });
    if (!inspectionRecord) throw new NotFoundException();
    return inspectionRecord;
  }

  async update(
    applicantId: string,
    id: string,
    updateInspectionRecordDto: UpdateInspectionRecordDto
  ) {
    const inspectionRecord = { ...updateInspectionRecordDto, applicantId, id };
    const { affected } = await this.inspectionRecordRepository.update(
      id,
      inspectionRecord
    );
    if (!affected) throw new NotFoundException();
    return inspectionRecord;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.inspectionRecordRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
