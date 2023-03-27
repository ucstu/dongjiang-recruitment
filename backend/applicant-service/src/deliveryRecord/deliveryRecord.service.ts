import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  FindOptionsWhere,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateDeliveryRecordDto } from "./dto/create-deliveryRecord.dto";
import { UpdateDeliveryRecordDto } from "./dto/update-deliveryRecord.dto";
import { DeliveryRecord } from "./entities/deliveryRecord.entity";

@Injectable()
export class DeliveryRecordService {
  constructor(
    @InjectRepository(DeliveryRecord)
    private readonly deliveryRecordRepository: Repository<DeliveryRecord>
  ) {}

  async create(applicantId: string, createDeliveryRecordDto: CreateDeliveryRecordDto) {
    return await this.deliveryRecordRepository.save({
      ...createDeliveryRecordDto,
      applicantId,
    });
  }

  async findAll(
    applicantId: string,
    query: Array<FindOptionsWhere<DeliveryRecord>>,
    { page, size, sort }: Pagination<DeliveryRecord>
  ) {
    return {
      total: await this.deliveryRecordRepository.count({
        where: query.map((q) => ({ ...q, applicantId })),
      }),
      items: await this.deliveryRecordRepository.find({
        where: { ...query, applicantId },
        skip: page * size,
        take: size,
        order: sort,
      }),
    };
  }

  async findOne(applicantId: string, id: string) {
    const deliveryRecord = await this.deliveryRecordRepository.findOne({
      where: { applicantId, id },
    });
    if (!deliveryRecord) throw new NotFoundException();
    return deliveryRecord;
  }

  async update(applicantId: string, id: string, updateDeliveryRecordDto: UpdateDeliveryRecordDto) {
    const deliveryRecord = { ...updateDeliveryRecordDto, applicantId, id };
    const { affected } = await this.deliveryRecordRepository.update(id, deliveryRecord);
    if (!affected) throw new NotFoundException();
    return deliveryRecord;
  }

  async remove(applicantId: string, id: string) {
    const { affected } = await this.deliveryRecordRepository.softDelete(id);
    if (!affected) throw new NotFoundException();
    return id;
  }
}
