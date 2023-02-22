import { Pagination } from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  EntityPropertyNotFoundError,
  InjectRepository,
  Repository,
} from "@dongjiang-recruitment/nest-common/dist/typeorm";
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";
import { AdvertiserInformation } from "./entities/advertiser.entity";

@Injectable()
export class AdvertiserService {
  constructor(
    @InjectRepository(AdvertiserInformation)
    private readonly advertiserRepository: Repository<AdvertiserInformation>
  ) {}

  async create(createAdvertiserDto: CreateAdvertiserDto) {
    return await this.advertiserRepository.insert(createAdvertiserDto);
  }

  async findAll({ page, size, sort }: Pagination) {
    try {
      return await this.advertiserRepository.find({
        skip: page * size,
        take: size,
        order: Object.fromEntries(sort),
      });
    } catch (error) {
      if (error instanceof EntityPropertyNotFoundError) {
        throw new BadRequestException(error.message);
      }
      throw error;
    }
  }

  async findOne(advertiserid: string) {
    const advertiserInformation = await this.advertiserRepository.findOne({
      where: {
        advertiserInformationId: advertiserid,
      },
    });
    if (!advertiserInformation) throw new NotFoundException();
    return advertiserInformation;
  }

  async update(advertiserid: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    const { affected } = await this.advertiserRepository.update(advertiserid, {
      ...updateAdvertiserDto,
      advertiserInformationId: advertiserid,
    });
    if (!affected) throw new NotFoundException();
    return await this.findOne(advertiserid);
  }

  async remove(advertiserid: string) {
    const removed = await this.findOne(advertiserid);
    if (!removed) throw new NotFoundException();
    await this.advertiserRepository.delete(advertiserid);
    return removed;
  }
}
