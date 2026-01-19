/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

/*
https://docs.nestjs.com/providers#services
*/

import { Injectable, Request } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from 'src/managers/managers.entity';
import { SubscriptionEntity } from './subscriptions.entity';

@Injectable()
export class SubscriptionsService {
  constructor(
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}
  async getSubscriptions(): Promise<object> {
    const subscriptions = await this.subscriptionRepository.find();
    return subscriptions;
  }
  async getManagerSubscription(@Request() req): Promise<object> {
    const manager = await this.managerRepository.findOneOrFail({
      where: { id: req.user.id },
      relations: ['subscription'],
    });
    return manager.subscription;
  }
  async subscribeToPlan(planId: number, @Request() req): Promise<object> {
    const subscription = await this.subscriptionRepository.findOneOrFail({
      where: { id: planId },
    });
    const manager = await this.managerRepository.findOneOrFail({
      where: { id: req.user.id },
    });
    manager.subscription = subscription;
    await this.managerRepository.save(manager);
    return {
      message: 'Subscribed to plan successfully',
      subscription,
    };
  }
}
