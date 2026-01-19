/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
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
  @Get('/all')
  getAllRestaurants(): object {
    return this.restaurantsService.getAllRestaurants();
  }
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
  @Get(':id')
  @UseGuards(AuthGuard)
  getRestaurantById(@Param('id') id: number): object {
    return this.restaurantsService.getRestaurantById(id);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  deleteRestaurant(@Param('id') id: number): object {
    return this.restaurantsService.deleteRestaurant(id);
  }
  @UseGuards(AuthGuard)
  @Put(':id')
  @UsePipes(new ValidationPipe())
  updateRestaurant(
    @Param('id') id: number,
    @Body() data: RestaurantDto,
  ): object {
    return this.restaurantsService.updateRestaurant(id, data);
  }
}
