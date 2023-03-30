import { Public } from "@dongjiang-recruitment/nest-common/dist/auth";
import type {
  Areas,
  Cities,
  DirectionTags,
  FilterCriteria,
  PositionTypes,
} from "@dongjiang-recruitment/nest-common/dist/http";
import { Controller, Get, Query } from "@nestjs/common";
import { CommonService } from "./common.service";

@Public()
@Controller("common")
export class CommonController {
  constructor(private readonly commonService: CommonService) {}

  @Get("areas")
  getAreas(@Query("cityName") cityName: string): Areas {
    return this.commonService.getAreas(cityName);
  }

  @Get("cities")
  getCities(): Cities {
    return this.commonService.getCities();
  }

  @Get("filterCriteria")
  getFilterCriteria(): FilterCriteria {
    return this.commonService.getFilterCriteria();
  }

  @Get("positionTypes")
  getPositionTypes(): PositionTypes {
    return this.commonService.getPositionTypes();
  }

  @Get("directionTags")
  getDirectionTags(): DirectionTags {
    return this.commonService.getDirectionTags();
  }

  @Get("verificationCode")
  getVerificationCode(@Query("email") email: string) {
    return this.commonService.getVerificationCode(email);
  }

  @Get("newVersion")
  getNewVersion() {
    return this.commonService.getNewVersion();
  }
}
