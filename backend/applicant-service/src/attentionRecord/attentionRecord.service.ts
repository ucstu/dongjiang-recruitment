import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateAttentionRecordDto } from "./dto/create-attentionRecord.dto";
import { UpdateAttentionRecordDto } from "./dto/update-attentionRecord.dto";
import { AttentionRecord } from "./entities/attentionRecord.entity";

@Injectable()
export class AttentionRecordService {
  constructor(
    @InjectRepository(AttentionRecord)
    private readonly attentionRecordRepository: Repository<AttentionRecord>
  ) {}

  async create(
    applicantId: string,
    createAttentionRecordDto: CreateAttentionRecordDto
  ) {
    return await this.attentionRecordRepository.save({
      ...createAttentionRecordDto,
      applicantId,
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<AttentionRecord>>,
    { page, size, sort }: Pagination<AttentionRecord>
  ) {
    return {
      total: await this.attentionRecordRepository.count({
        where: query.map((q) => ({ ...q, applicantId })),
      }),
      items: await this.attentionRecordRepository.find({
        where: query.map((q) => ({ ...q, applicantId })),
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(applicantId: string, id: string) {
    const attentionRecord = await this.attentionRecordRepository.findOne({
      where: { applicantId, id },
    });
    if (!attentionRecord) throw new NotFoundException();
    return attentionRecord;
  }

  async update(
    applicantId: string,
    id: string,
    updateAttentionRecordDto: UpdateAttentionRecordDto
  ) {
    const attentionRecord = { ...updateAttentionRecordDto, applicantId, id };
    const { affected } = await this.attentionRecordRepository.update(
      id,
      attentionRecord
    );
    if (!affected) throw new NotFoundException();
    return attentionRecord;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.attentionRecordRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
