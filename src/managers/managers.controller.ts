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
  Query,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagerDto } from './managers.dto';

@Controller('managers')
export class ManagersController {
  constructor(private readonly ManagersService: ManagersService) {}
  @Post()
  createManager(@Body() data: ManagerDto): object {
    return this.ManagersService.create(data);
  }
  @Get()
  getManagers(): object {
    return this.ManagersService.getManagers();
  }
  @Get('by-email')
  getManagerByEmail(@Query('email') email: string): object {
    return this.ManagersService.getManagerByEmail(email);
  }
  @Put(':email')
  updateManager(
    @Param('email') email: string,
    @Body() data: ManagerDto,
  ): object {
    return this.ManagersService.update(email, data);
  }
  @Delete(':email')
  deleteManager(@Param('email') email: string): object {
    return this.ManagersService.delete(email);
  }
}
