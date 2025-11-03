import { ManagersModule } from './managers/managers.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CustomersModule } from './customers/customers.module';

@Module({
  imports: [ManagersModule, CustomersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
