/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
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
  UseGuards,
  UsePipes,
  ValidationPipe,
  Request,
  Response,
} from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagerDto, ManagerSignInDto } from './managers.dto';
import { AuthGuard } from './auth.guard';

@Controller('managers')
export class ManagersController {
  constructor(private readonly ManagersService: ManagersService) {}
  @Post()
  @UsePipes(new ValidationPipe())
  // @UseInterceptors(
  //   FileInterceptor('file', {
  //     fileFilter: (req, file, cb) => {
  //       if (!file.mimetype.match(/\/(pdf)$/)) {
  //         cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'pdf'), false);
  //       } else {
  //         cb(null, true);
  //       }
  //     },
  //     storage: diskStorage({
  //       destination: './uploads',
  //       filename: (req, file, cb) => {
  //         cb(null, `${Date.now()}-${file.originalname}`);
  //       },
  //     }),
  //   }),
  // )
  createManager(
    @Body() data: ManagerDto,
    // @UploadedFile() file: Express.Multer.File,
  ): object {
    return this.ManagersService.create(data);
  }
  @Post('sign-in')
  @UsePipes(new ValidationPipe())
  signIn(
    @Body() data: ManagerSignInDto,
    @Response({ passthrough: true }) res,
  ): object {
    return this.ManagersService.signIn(data, res);
  }
  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req: Request): object {
    return (req as any)?.user;
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
  @Post('subscribe/:subscriptionId')
  @UseGuards(AuthGuard)
  subscribeManager(
    @Param('subscriptionId') subscriptionId: number,
    @Request() req,
  ): object {
    return this.ManagersService.subscribeToSubscription(
      req.user.id,
      subscriptionId,
    );
  }
  @Delete(':id')
  deleteManager(@Param('id') managerId: number): object {
    return this.ManagersService.delete(managerId);
  }
}
