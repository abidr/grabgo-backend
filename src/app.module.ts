import { ManagersModule } from './managers/managers.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AdminsModule } from './admins/admins.module';

@Module({
  imports: [AdminsModule, ManagersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
