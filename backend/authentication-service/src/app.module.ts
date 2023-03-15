import { CommonModule } from "@dongjiang-recruitment/nest-common";
import { Module } from "@nestjs/common";
import { AccountModule } from "./account/account.module";
import { ActionsModule } from "./actions/actions.module";
import { AuthorityModule } from "./authority/authority.module";
import { AuthorityGroupModule } from "./authority-group/authority-group.module";

@Module({
  imports: [
    CommonModule,
    AccountModule,
    ActionsModule,
    AuthorityModule,
    AuthorityGroupModule,
  ],
})
export class AppModule {}
