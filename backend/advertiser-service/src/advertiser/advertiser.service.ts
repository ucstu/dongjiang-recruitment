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

  create(createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserRepository.save(createAdvertiserDto);
  }

  findAll() {
    return this.advertiserRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} advertiser`;
  }

  update(id: number, updateAdvertiserDto: UpdateAdvertiserDto) {
    return `This action updates a #${id} advertiser`;
  }

  remove(id: number) {
    return `This action removes a #${id} advertiser`;
  }
}
