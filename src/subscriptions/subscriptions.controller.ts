/*
https://docs.nestjs.com/controllers#controllers
*/

import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from 'src/managers/auth.guard';
import { SubscriptionsService } from './subscriptions.service';

@Controller('subscriptions')
export class SubscriptionsController {
  constructor(private readonly subscriptionService: SubscriptionsService) {}
  @Get('/all')
  getAllSubscriptions(): object {
    return this.subscriptionService.getSubscriptions();
  }
  @Get('/manager')
  @UseGuards(AuthGuard)
  getManagerSubscription(@Request() req): object {
    return this.subscriptionService.getManagerSubscription(req);
  }
  @Post('/subscribe/:planId')
  @UseGuards(AuthGuard)
  subscribeToPlan(@Param('planId') planId: number, @Request() req): object {
    return this.subscriptionService.subscribeToPlan(planId, req);
  }
}
