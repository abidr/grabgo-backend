import { RestaurantsService } from './restaurants.service';
import { RestaurantsController } from './restaurants.controller';
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { RestaurantEntity } from './restaurants.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/managers/managers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RestaurantEntity, ManagerEntity])],
  controllers: [RestaurantsController],
  providers: [RestaurantsService],
})
export class RestaurantsModule {}
