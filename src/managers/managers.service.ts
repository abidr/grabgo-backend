/*
https://docs.nestjs.com/providers#services
*/

import { HttpException, Injectable } from '@nestjs/common';
import { ManagerDto } from './managers.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { ManagerEntity } from './managers.entity';
import { MoreThan, Repository, TypeORMError } from 'typeorm';

const managers: ManagerDto[] = [];

@Injectable()
export class ManagersService {
  constructor(
    @InjectRepository(ManagerEntity)
    private managerRepository: Repository<ManagerEntity>,
  ) {}
  getManagers(): ManagerDto[] {
    return managers;
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
  getManagerByEmail(email: string): ManagerDto | object {
    const manager = managers.find((manager) => manager.email === email);
    if (!manager) {
      return {
        message: 'Manager not found',
      };
    }
    return manager;
  }
  getManagerByPhone(phone: string): ManagerDto | object {
    const manager = managers.find((manager) => manager.phoneNumber === phone);
    if (!manager) {
      return {
        message: 'Manager not found',
      };
    }
    return manager;
  }
  async create(data: ManagerDto, fileName: string): Promise<object> {
    try {
      return await this.managerRepository.save({
        fullName: `${data.firstName} ${data.lastName}`,
        email: data.email,
        phoneNumber: data.phoneNumber,
        password: data.password,
        gender: data.gender,
        age: parseInt(data.age, 10),
        file: fileName,
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
  delete(email: string): object {
    return {
      message: `Manager with email ${email} deleted successfully`,
    };
  }
}
