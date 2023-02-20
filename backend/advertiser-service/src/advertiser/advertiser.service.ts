import {
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import { Injectable } from "@nestjs/common";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";
import { AdvertiserInformation } from "./entities/advertiser.entity";

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(AdvertiserInformation)
    private advertiserRepository: Repository<AdvertiserInformation>
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    return await this.advertiserRepository.insert(createAdvertiserDto);
  }

  async findAll() {
    return await this.advertiserRepository.find({
      skip: 1,
      take: 5,
    });
  }

  async findOne(id: string) {
    return await this.advertiserRepository.findOne({
      where: {
        advertiserInformationId: id,
      },
    });
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    await this.advertiserRepository.update(id, {
      ...updateAdvertiserDto,
      advertiserInformationId: id,
    });
    return await this.findOne(id);
  }

  async remove(id: string) {
    const removed = await this.findOne(id);
    await this.advertiserRepository.delete(id);
    return removed;
  }
}
