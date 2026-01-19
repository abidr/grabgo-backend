/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { ManagerDto, ManagerSignInDto } from './managers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from './managers.entity';
import { Repository, TypeORMError } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SubscriptionEntity } from 'src/subscriptions/subscriptions.entity';
import { Response } from 'express';

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
  async getProfile(managerId: number): Promise<ManagerEntity> {
    return this.managerRepository.findOneOrFail({ where: { id: managerId } });
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
  async signIn(data: ManagerSignInDto, res: Response): Promise<void | object> {
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
      firstName: manager.firstName,
      lastName: manager.lastName,
      status: manager.status,
    };
    const accessToken = await this.jwtService.signAsync(payload);
    res.cookie('access_token', accessToken, {
      httpOnly: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day
      sameSite: 'strict',
    });
    return {
      accessToken,
    };
  }
  signOut(res: Response): object {
    res.clearCookie('access_token');
    return {
      message: 'Logged out successfully',
    };
  }
  async create(data: ManagerDto): Promise<object> {
    try {
      return await this.managerRepository.save(
        this.managerRepository.create({
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          phoneNumber: data.phoneNumber,
          password: data.password,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
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
  async updateProfile(data: ManagerDto, managerId: number): Promise<object> {
    try {
      await this.managerRepository.update(
        { id: managerId },
        {
          firstName: data.firstName,
          lastName: data.lastName,
          phoneNumber: data.phoneNumber,
          gender: data.gender,
          dateOfBirth: data.dateOfBirth,
        },
      );
      return await this.managerRepository.findOneOrFail({
        where: { id: managerId },
      });
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
  delete(managerId: number): object {
    return this.managerRepository.delete({
      id: managerId,
    });
  }
}
