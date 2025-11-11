import { Body, Controller, Delete, Get, Param, Post, Put, Patch, Query } from '@nestjs/common';
import { DeliverymanService } from './deliveryman.service';
import { CreateDeliverymanDto } from './dto/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';

@Controller('deliveryman')
export class DeliverymanController {
  constructor(private readonly deliverymanService: DeliverymanService) {}

  @Post()
  create(@Body() data: CreateDeliverymanDto) {
    return this.deliverymanService.create(data);
  }

  @Get()
  findAll() {
    return this.deliverymanService.getAll(); // <-- method name match
  }

  @Get('by-email')
  findOne(@Query('email') email: string) {
    return this.deliverymanService.getByEmail(email); // <-- method name match
  }

  @Put(':email')
  update(@Param('email') email: string, @Body() data: UpdateDeliverymanDto) {
    return this.deliverymanService.update(email, data);
  }

  @Patch(':email')
  partialUpdate(@Param('email') email: string, @Body() data: UpdateDeliverymanDto) {
    return this.deliverymanService.update(email, data); 
  }

  @Delete(':email')
  remove(@Param('email') email: string) {
    return this.deliverymanService.remove(email);
  }
}
