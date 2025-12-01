/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RestaurantDto } from './restaurants.dto';
import { RestaurantsService } from './restaurants.service';
import { AuthGuard } from 'src/managers/auth.guard';

@Controller('restaurants')
export class RestaurantsController {
  constructor(private readonly restaurantsService: RestaurantsService) {}
  @Post()
  @UseGuards(AuthGuard)
  @UsePipes(new ValidationPipe())
  createRestaurant(@Body() data: RestaurantDto, @Request() req): object {
    return this.restaurantsService.createRestaurant(data, req);
  }
  @Get()
  @UseGuards(AuthGuard)
  getRestaurants(@Request() req): object {
    return this.restaurantsService.getRestaurants(req);
  }
}
