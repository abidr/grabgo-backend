import { ManagersModule } from './managers/managers.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';
import { AdminsModule } from './admins/admins.module';
import { User2Module } from './user2/user2.module';


@Module({
  imports: [ManagersModule, CustomersModule, AdminsModule, User2Module],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
