import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './managers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagerEntity])],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
