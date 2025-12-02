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
  Patch,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
} from '@nestjs/common';
import { AdminService } from './admins.service';
import { AdminsDto } from './admins.dto';
import { Admin } from './admins.entity';
import { AdminProfile } from './AdminProfile.entity';
import { MenuItem } from './MenuItems.entity';
import { CreateMenuItemDto } from './create-menu-item.dto';
import { CreateAdminProfileDto } from './create-admin-profile.dto';

@Controller('admins')
@UsePipes(ValidationPipe)
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
  @Get('by-joiningDate')
  getAdminByJoiningDate(@Query('joiningDate') joiningDate: string): object {
    return this.adminService.getAdminByJoiningDate(joiningDate);
  }
  @Get('by-country')
  getAdminByCountry(@Query('country') country: string): object {
    return this.adminService.getAdminByCountry(country);
  }
  @Get('country-default')
  getAdminByDefaultCountry(): object {
    return this.adminService.getAdminByDefaultCountry();
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


  // @Patch(':email')
  // partialUpdateAdmin(
  //   @Param('email') email: string,
  //   @Body() data: Partial<AdminsDto>,
  // ): object {
  //   return this.adminService.partialUpdate(email, data);
  // }
  @Patch(':email')
   partialUpdateAdminCountry(
    @Param('email') email: string,
    @Body() data: Partial<AdminsDto>,
  ): object {
    return this.adminService.updateCountry(email, data);
  }
  // AdminProfile routes
  @Post(':adminId/profile')
  createProfile(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() data: CreateAdminProfileDto,
  ): Promise<AdminProfile> {
    return this.adminService.createProfile(adminId, data);
  }

  @Get(':adminId/profile')
  getProfile(@Param('adminId', ParseIntPipe) adminId: number): Promise<AdminProfile> {
    return this.adminService.getProfileByAdmin(adminId);
  }

  @Patch(':adminId/profile')
  updateProfile(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() data: Partial<CreateAdminProfileDto>,
  ): Promise<AdminProfile> {
    return this.adminService.updateProfile(adminId, data);
  }

  @Delete(':adminId/profile')
  deleteProfile(@Param('adminId', ParseIntPipe) adminId: number) {
    return this.adminService.deleteProfile(adminId);
  }

  // Menu items routes
  @Post(':adminId/menu-items')
  createMenuItem(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Body() data: CreateMenuItemDto,
  ): Promise<MenuItem> {
    return this.adminService.createMenuItem(adminId, data);
  }

  @Get('menu-items')
  getAllMenuItems(): Promise<MenuItem[]> {
    return this.adminService.getAllMenuItems();
  }

  @Get(':adminId/menu-items')
  getMenuItems(@Param('adminId', ParseIntPipe) adminId: number): Promise<MenuItem[]> {
    return this.adminService.getMenuItemsByAdmin(adminId);
  }

  @Get(':adminId/menu-items/:id')
  getMenuItemById(
    @Param('adminId', ParseIntPipe) adminId: number,
    @Param('id', ParseIntPipe) id: number,
  ): Promise<MenuItem> {
    return this.adminService.getMenuItemById(id);
  }

  @Patch('menu-items/:id')
  updateMenuItem(@Param('id', ParseIntPipe) id: number, @Body() data: Partial<CreateMenuItemDto>) {
    return this.adminService.updateMenuItem(id, data);
  }

  @Delete('menu-items/:id')
  deleteMenuItem(@Param('id', ParseIntPipe) id: number) {
    return this.adminService.deleteMenuItem(id);
  }

  @Post('login')
  async login(
    @Body() body: { email: string; password: string },
  ): Promise<{ access_token: string }> {
    return this.adminService.login(body.email, body.password);
  }
}
