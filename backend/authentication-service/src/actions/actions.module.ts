import { Module } from "@nestjs/common";
import { AccountService } from "../account/account.service";
import { ActionsController } from "./actions.controller";
import { ActionsService } from "./actions.service";

@Module({
  imports: [AccountService],
  controllers: [ActionsController],
  providers: [ActionsService],
})
export class ActionsModule {}
