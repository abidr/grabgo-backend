/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { ManagerDto } from './managers.dto';

const managers: ManagerDto[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'password123',
    gender: 'male',
    dateOfBirth: '1990-01-01',
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '0987654321',
    password: 'password456',
    gender: 'female',
    dateOfBirth: '1992-02-02',
  },
];

@Injectable()
export class ManagersService {
  getManagers(): ManagerDto[] {
    return managers;
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
  create(data: ManagerDto): object {
    managers.push(data);
    return data;
  }
  update(email: string, data: ManagerDto): object {
    const index = managers.findIndex((manager) => manager.email === email);
    if (index === -1) {
      return {
        message: 'Manager not found',
      };
    }
    managers[index] = data;
    return data;
  }
  delete(email: string): object {
    return {
      message: `Manager with email ${email} deleted successfully`,
    };
  }
}
