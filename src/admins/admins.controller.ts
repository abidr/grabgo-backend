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
import { AdminService } from './admins.service';
import { AdminsDto } from './admins.dto';

@Controller('admins')
export class AdminsController {
  constructor(private readonly adminService: AdminService) {}
  @Post()
  createAdmin(@Body() data: AdminsDto): object {
    return this.adminService.create(data);
  }
  @Get()
  getAdmins(): object {
    return this.adminService.getAdmins();
  }
  @Get('by-email')
  getAdminByEmail(@Query('email') email: string): object {
    return this.adminService.getAdminByEmail(email);
  }
  @Put(':email')
  updateAdmin(
    @Param('email') email: string,
    @Body() data: AdminsDto,
  ): object {
    return this.adminService.update(email, data);
  }
  @Delete(':email')
  deleteAdmin(@Param('email') email: string): object {
    return this.adminService.delete(email);
  }
}
