import { PartialType } from "@nestjs/mapped-types";
import { CreateAccountInformationDto } from "./create-account-information.dto";

export class UpdateAccountInformationDto extends PartialType(
  CreateAccountInformationDto
) {}
