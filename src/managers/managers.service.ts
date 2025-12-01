/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { ManagerDto, ManagerSignInDto } from './managers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from './managers.entity';
import { MoreThan, Repository, TypeORMError } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SubscriptionEntity } from 'src/subscriptions/subscriptions.entity';

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
    @InjectRepository(SubscriptionEntity)
    private subscriptionRepository: Repository<SubscriptionEntity>,
    private jwtService: JwtService,
  ) {}
  async getManagers(): Promise<ManagerEntity[]> {
    return this.managerRepository.find();
  }
  async getInactiveManagers(): Promise<ManagerEntity[]> {
    return this.managerRepository.find({ where: { status: 'inactive' } });
  }
  async getManagersOlderThan(age: number): Promise<ManagerEntity[]> {
    return this.managerRepository.find({
      where: {
        age: MoreThan(age),
      },
    });
  }
  async getManagerByEmail(email: string): Promise<ManagerEntity | object> {
    const manager = await this.managerRepository.findOne({ where: { email } });
    if (!manager) {
      return {
        message: 'Manager not found',
      };
    }
    return manager;
  }
  async getManagerByPhone(phone: string): Promise<ManagerEntity | object> {
    const manager = await this.managerRepository.findOne({
      where: { phoneNumber: phone },
    });
    if (!manager) {
      return {
        message: 'Manager not found',
      };
    }
    return manager;
  }
  async signIn(data: ManagerSignInDto): Promise<void | object> {
    const manager = await this.managerRepository.findOne({
      where: { email: data.email },
    });
    if (!manager) {
      throw new HttpException('Invalid credentials', 400);
    }
    const isPasswordValid = await bcrypt.compare(
      data.password,
      manager.password,
    );
    if (!isPasswordValid) {
      throw new HttpException('Invalid credentials', 400);
    }
    const payload = {
      id: manager.id,
      email: manager.email,
      fullName: manager.fullName,
      status: manager.status,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    return {
      accessToken,
    };
  }
  async create(data: ManagerDto, fileName: string): Promise<object> {
    try {
      return await this.managerRepository.save(
        this.managerRepository.create({
          fullName: `${data.firstName} ${data.lastName}`,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          gender: data.gender,
          age: parseInt(data.age, 10),
          file: fileName,
        }),
      );
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new HttpException(error.message, 400);
      } else {
        throw new HttpException('Internal Server Error', 500);
      }
    }
  }
  async update(email: string, data: ManagerDto): Promise<object> {
    try {
      await this.managerRepository.update(
        { email },
        {
          status: data.status,
        },
      );
      return await this.managerRepository.findOneOrFail({ where: { email } });
    } catch (error) {
      if (error instanceof TypeORMError) {
        throw new HttpException(error.message, 400);
      } else {
        throw new HttpException('Internal Server Error', 500);
      }
    }
  }
  async subscribeToSubscription(
    managerId: number,
    subscriptionId: number,
  ): Promise<object> {
    const manager = await this.managerRepository.findOneOrFail({
      where: { id: managerId },
    });
    const subscription = await this.subscriptionRepository.findOneOrFail({
      where: { id: subscriptionId },
    });
    manager.subscription = subscription;
    await this.managerRepository.save(manager);
    return {
      message: 'Subscription added to manager successfully',
      manager,
    };
  }
  delete(): object {
    return this.managerRepository.delete({
      status: 'inactive',
    });
  }
}
