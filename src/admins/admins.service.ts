/*
https://docs.nestjs.com/providers#services
*/

import { Injectable } from '@nestjs/common';
import { AdminsDto} from './admins.dto';

const admins: AdminsDto[] = [
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
export class AdminService {
  getAdmins(): object {
    return {
      success: true,
      data: admins,
    };
  }
  getAdminByEmail(email: string): AdminsDto | object {
    const admin = admins.find((admin) => admin.email === email);
    if (!admin) {
      return {
        message: 'Admin not found',
      };
    }
    return admin;
  }
  create(data: AdminsDto): object {
    admins.push(data);
    return data;
  }
  update(email: string, data: AdminsDto): object {
    const index = admins.findIndex((a) => a.email === email);
    if (index === -1) {
      return {
        message: 'Admin not found',
      };
    }
    admins[index] = data;
    return data;
  }
  delete(email: string): object {
    return {
      message: `Admin with email ${email} deleted successfully`,
    };
  }
}
