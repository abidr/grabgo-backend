import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
