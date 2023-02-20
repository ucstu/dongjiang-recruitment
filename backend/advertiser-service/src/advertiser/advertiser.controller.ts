import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
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
  @Public()
  create(@Body() createAdvertiserDto: CreateAdvertiserDto) {
    return this.advertiserService.create(createAdvertiserDto);
  }

  @Get()
  @Public()
  findAll() {
    return this.advertiserService.findAll();
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.advertiserService.findOne(+id);
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateAdvertiserDto: UpdateAdvertiserDto
  ) {
    return this.advertiserService.update(+id, updateAdvertiserDto);
  }

  @Delete(":id")
  remove(@Param("id") id: string) {
    return this.advertiserService.remove(+id);
  }
}
