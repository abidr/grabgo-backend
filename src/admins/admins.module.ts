import { AdminService} from './admins.service';
import { AdminsController } from './admins.controller';
 import { Admin } from "./admins.entity";
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Admin])],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminsModule {}
