import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseInterceptors, UsePipes, ValidationPipe, UploadedFile } from '@nestjs/common';
import { User2Service } from './user2.service';
import { User2Dto } from './user2.dto';
import { FileInterceptor } from '@nestjs/platform-express';
// import { FileUploadValidationPipe } from '../common/pipes/file-upload.pipe';
import { diskStorage, MulterError } from 'multer';

@Controller('user2')
@UsePipes(new ValidationPipe())
export class User2Controller {
  constructor(private readonly user: User2Service) {}

  @Get()
  getAll() { return this.user.getAll(); }

  @Get('by-email')
  getByEmail(@Query('email') email: string) { return this.user.getByEmail(email); }

  @Post()
  @UsePipes(new ValidationPipe())
   @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
          cb(new MulterError('LIMIT_UNEXPECTED_FILE', 'file'), false);
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
 
 create(@Body() data: User2Dto, @UploadedFile() file: Express.Multer.File) :object{
    console.log('Uploaded file:', file);
    return this.user.create(data, file.filename);
  }

  @Put(':email')

  replace(@Param('email') email: string, @Body() data: User2Dto) { return this.user.update(email, data); }

  @Delete(':email')
  remove(@Param('email') email: string) { return this.user.remove(email); }
}
