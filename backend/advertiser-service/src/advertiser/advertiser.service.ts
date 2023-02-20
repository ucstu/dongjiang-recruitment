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
    private advertiserRepository: Repository<AdvertiserInformation>
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

  async findOne(id: string) {
    const advertiserInformation = await this.advertiserRepository.findOne({
      where: {
        advertiserInformationId: id,
      },
    });
    if (!advertiserInformation) throw new NotFoundException();
    return advertiserInformation;
  }

  async update(id: string, updateAdvertiserDto: UpdateAdvertiserDto) {
    const { affected } = await this.advertiserRepository.update(id, {
      ...updateAdvertiserDto,
      advertiserInformationId: id,
    });
    if (!affected) throw new NotFoundException();
    return await this.findOne(id);
  }

  async remove(id: string) {
    const removed = await this.findOne(id);
    if (!removed) throw new NotFoundException();
    await this.advertiserRepository.delete(id);
    return removed;
  }
}
