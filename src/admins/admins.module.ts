import { AdminService} from './admins.service';
import { AdminsController } from './admins.controller';
 import { Admin } from "./admins.entity";
import { AdminProfile } from './AdminProfile.entity';
import { MenuItem } from './MenuItems.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Admin, AdminProfile, MenuItem]), JwtModule.register({
    secret: 'yourSecretKey', // Replace with your own secret key
    signOptions: { expiresIn: '1h' }, // Token expiration time
  })],
  controllers: [AdminsController],
  providers: [AdminService],
})
export class AdminsModule {}
