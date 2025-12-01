/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Request } from '@nestjs/common';
import { RestaurantDto } from './restaurants.dto';
import { Repository } from 'typeorm';
import { RestaurantEntity } from './restaurants.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/managers/managers.entity';

@Injectable()
export class RestaurantsService {
  constructor(
    @InjectRepository(RestaurantEntity)
    private restaurantRepository: Repository<RestaurantEntity>,
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}
  async createRestaurant(data: RestaurantDto, @Request() req): Promise<object> {
    const restaurant = this.restaurantRepository.create(data);
    const manager = await this.managerRepository.findOneOrFail({
      where: { id: req.user.id },
    });
    restaurant.manager = manager;
    await this.restaurantRepository.save(restaurant);
    return {
      message: 'Restaurant created successfully',
      restaurant,
    };
  }
  async getRestaurants(@Request() req): Promise<object> {
    const manager = await this.managerRepository.findOneOrFail({
      where: { id: req.user.id },
      relations: ['restaurant'],
    });
    return manager.restaurant;
  }
}
