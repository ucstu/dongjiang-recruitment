import { Module } from "@nestjs/common";
import { PersonnelModule } from "./personnel/personnel.module";

@Module({
  imports: [PersonnelModule],
})
export class AppModule {}
