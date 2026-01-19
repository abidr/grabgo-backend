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
      relations: ['restaurants'],
    });
    return manager.restaurants;
  }
  async getAllRestaurants(): Promise<object> {
    return this.restaurantRepository.find({
      relations: ['manager'],
    });
  }
  getRestaurantById(id: number): Promise<object> {
    return this.restaurantRepository.findOneOrFail({
      where: { id },
    });
  }
  async deleteRestaurant(id: number): Promise<object> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });
    if (!restaurant) {
      return {
        message: 'Restaurant not found',
      };
    }
    await this.restaurantRepository.remove(restaurant);
    return {
      message: 'Restaurant deleted successfully',
    };
  }
  async updateRestaurant(id: number, data: RestaurantDto): Promise<object> {
    const restaurant = await this.restaurantRepository.findOne({
      where: { id },
    });
    if (!restaurant) {
      return {
        message: 'Restaurant not found',
      };
    }
    this.restaurantRepository.merge(restaurant, data);
    await this.restaurantRepository.save(restaurant);
    return {
      message: 'Restaurant updated successfully',
      restaurant,
    };
  }
}
