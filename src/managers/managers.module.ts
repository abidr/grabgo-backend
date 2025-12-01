import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagerEntity } from './managers.entity';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { SubscriptionEntity } from 'src/subscriptions/subscriptions.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([ManagerEntity, SubscriptionEntity]),
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [ManagersController],
  providers: [ManagersService],
})
export class ManagersModule {}
