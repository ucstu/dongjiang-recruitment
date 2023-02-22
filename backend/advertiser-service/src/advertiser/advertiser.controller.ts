import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
import {
  Page,
  Pagination,
} from "@dongjiang-recruitment/nest-common/dist/decorator";
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from "@nestjs/common";
import { AdvertiserService } from "./advertiser.service";
import { CreateAdvertiserDto } from "./dto/create-advertiser.dto";
import { UpdateAdvertiserDto } from "./dto/update-advertiser.dto";

@Controller("advertisers")
export class AdvertiserController {
  constructor(private readonly advertiserService: AdvertiserService) {}

  @Post()
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  @Public()
  findAll(@Page() page: Pagination) {
    return this.advertiserService.findAll(page);
  }

  @Get(":advertiserid")
  findOne(@Param("advertiserid") advertiserid: string) {
    return this.advertiserService.findOne(advertiserid);
  }

  @Put(":advertiserid")
  update(
    @Param("advertiserid") advertiserid: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto
  ) {
    return this.advertiserService.update(advertiserid, updateAdvertiserDto);
  }

  @Delete(":advertiserid")
  remove(@Param("advertiserid") advertiserid: string) {
    return this.advertiserService.remove(advertiserid);
  }
}
