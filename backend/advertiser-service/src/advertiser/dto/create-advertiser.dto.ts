import { OmitType } from "@nestjs/mapped-types";
import { AdvertiserInformation } from "../entities/advertiser.entity";

export class CreateAdvertiserDto extends OmitType(AdvertiserInformation, [
  "advertiserInformationId",
  "createdAt",
  "updatedAt",
  "deletedAt",
]) {}
