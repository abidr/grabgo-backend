/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionEntity } from './subscriptions.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SubscriptionEntity])],
  controllers: [],
  providers: [],
})
export class SubscriptionsModule {}
