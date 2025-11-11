import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { User2Service } from './user2.service';
import { User2Dto } from './user2.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileUploadValidationPipe } from '../common/pipes/file-upload.pipe';

@Controller('user2')
@UsePipes(new ValidationPipe())
export class User2Controller {
  constructor(private readonly user: User2Service) {}

  @Get()
  getAll() { return this.user.getAll(); }

  @Get('by-email')
  getByEmail(@Query('email') email: string) { return this.user.getByEmail(email); }

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(
    @Body() data: User2Dto,
    @UploadedFile(
      new FileUploadValidationPipe({ maxSize: 1_000_000, allowedMimeTypes: ['image/jpeg', 'image/png'] }),
    ) file: Express.Multer.File,
  ) {
    // file has been validated by the pipe; service currently stores only DTO data
    return this.user.create(data);
  }

  @Put(':email')

  replace(@Param('email') email: string, @Body() data: User2Dto) { return this.user.update(email, data); }

  @Delete(':email')
  remove(@Param('email') email: string) { return this.user.remove(email); }
}
