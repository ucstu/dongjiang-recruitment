import { Test, TestingModule } from "@nestjs/testing";
import { AdvertiserService } from "./advertiser.service";

describe("AdvertiserService", () => {
  let service: AdvertiserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AdvertiserService],
    }).compile();

    service = module.get<AdvertiserService>(AdvertiserService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
