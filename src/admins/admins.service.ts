import { Injectable, NotFoundException } from '@nestjs/common';
import { AdminsDto } from './admins.dto';
import { Admin } from './admins.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { get } from 'http';

const admins: AdminsDto[] = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phoneNumber: '1234567890',
    password: 'password123',
    gender: 'male',
    dateOfBirth: '1990-01-01',
    socialMediaURL: '',
    country: 'USA'
  },
  {
    firstName: 'Jane',
    lastName: 'Doe',
    email: 'jane.doe@example.com',
    phoneNumber: '0987654321',
    password: 'password456',
    gender: 'female',
    dateOfBirth: '1992-02-02',
    socialMediaURL: '',
    country: 'USA'
  },
];

@Injectable()
export class AdminService {
  constructor(@InjectRepository(Admin) private adminRepository: Repository<Admin>) { }

  //create admin
  async create(data: AdminsDto): Promise<Admin> {
    const newAdmin = this.adminRepository.create(data);
    return this.adminRepository.save(newAdmin);
  }

  //show all admin data
  async getAdmins(): Promise<Admin[]> {
    return this.adminRepository.find();
  }
  //update country
  async updateCountry(email: string, data: Partial<AdminsDto>): Promise<Admin> {
    const adminUpdated = await this.adminRepository.update({ email: email }, { country: data.country });
    if (adminUpdated.affected === 0) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    const admin = await this.adminRepository.findOne({ where: { email: email } });
    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    return admin;
  }

  //get admin by joining date
  async getAdminByJoiningDate(joiningDate: string): Promise<Admin[]> {
    const start = new Date(joiningDate);
    start.setHours(0, 0, 0, 0);
    const end = new Date(joiningDate);
    end.setHours(23, 59, 59, 999);
    const admins = await this.adminRepository.find({
      where: { joiningDate: Between(start, end) }
    });
    return admins;
  }
  //get admin by country
  async getAdminByCountry(country: string): Promise<Admin[]> {
    const admins = await this.adminRepository.find({
      where: { country: country }
    });
    return admins;
  }
//get admin by default country
  async getAdminByDefaultCountry(): Promise<Admin[]> {
    const admins = await this.adminRepository.find({
      where: { country: 'unknown' }
    });
    return admins;
  }
//delete admin
  async delete(email: string): Promise<{ message: string }> {
    const adminDeleted = await this.adminRepository.delete({ email: email });
    if (adminDeleted.affected === 0) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    return { message: `Admin with email ${email} deleted successfully` };
  }
  async getAdminByID(id: number): Promise<Admin> {
    const admin = await this.adminRepository.findOneBy({ id: id });
    if (!admin) {
      throw new NotFoundException(`Admin with ID ${id} not found`);
    }
    return admin;
  }

  partialUpdate(email: string, data: Partial<AdminsDto>): object {
    const admin = admins.find((admin) => admin.email === email);
    if (!admin) {
      return {
        message: 'Admin not found',
      };
    }
    Object.assign(admin, data);
    return admin;
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
  // delete(email: string): object {
  //   return {
  //     message: `Admin with email ${email} deleted successfully`,
  //   };
  // }


}
