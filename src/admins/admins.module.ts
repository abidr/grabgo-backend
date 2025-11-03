import { AdminService} from './admins.service';
import { AdminsController } from './admins.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminsModule {}
