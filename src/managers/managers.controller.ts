/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UploadedFile,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagerDto } from './managers.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage, MulterError } from 'multer';

@Controller('managers')
export class ManagersController {
  constructor(private readonly ManagersService: ManagersService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.mimetype.match(/\/(pdf)$/)) {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
        } else {
          cb(null, true);
        }
      },
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          cb(null, `${Date.now()}-${file.originalname}`);
        },
      }),
    }),
  )
  createManager(
    @Body() data: ManagerDto,
    @UploadedFile() file: Express.Multer.File,
  ): object {
    return this.ManagersService.create(data, file.filename);
  }
  @Get()
  getManagers(): object {
    return this.ManagersService.getManagers();
  }
  @Get('by-email')
  getManagerByEmail(@Query('email') email: string): object {
    return this.ManagersService.getManagerByEmail(email);
  }
  @Get('by-phone')
  getManagerByPhone(@Query('phone') phone: string): object {
    return this.ManagersService.getManagerByPhone(phone);
  }
  @Get('inactive')
  getInactiveManagers(): object {
    return this.ManagersService.getInactiveManagers();
  }
  @Get('older-than/:age')
  getManagersOlderThan(@Param('age') age: number): object {
    return this.ManagersService.getManagersOlderThan(age);
  }
  @Put(':email')
  updateManager(
    @Param('email') email: string,
    @Body() data: ManagerDto,
  ): object {
    return this.ManagersService.update(email, data);
  }
  @Patch(':email')
  patchUpdateManager(
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
