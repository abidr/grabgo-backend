import { Injectable, NotFoundException, HttpException, } from '@nestjs/common';
import { AdminsDto } from './admins.dto';
import { Admin } from './admins.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { AdminProfile } from './AdminProfile.entity';
import { MenuItem } from './MenuItems.entity';
import { CreateMenuItemDto } from './create-menu-item.dto';
import { CreateAdminProfileDto } from './create-admin-profile.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { HttpStatus } from '@nestjs/common';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
    @InjectRepository(AdminProfile) private profileRepository: Repository<AdminProfile>,
    @InjectRepository(MenuItem) private menuRepository: Repository<MenuItem>,
    private jwtService: JwtService,
  ) { }

  //create admin
  async create(data: AdminsDto): Promise<Admin> {
    const saltRounds = Number(process.env.SALT_ROUNDS) || 10;
    const hashed = await bcrypt.hash(data.password, saltRounds);
    const newAdmin = this.adminRepository.create({ ...data, password: hashed });
    const saved = await this.adminRepository.save(newAdmin);
    // remove password before returning
    try {
      (saved as any).password = undefined;
    } catch {
      // ignore
    }
    return saved;
  }

  //show all admin data
  async getAdmins(): Promise<Admin[]> {
    return this.adminRepository.find({
      // select:{
      //   "firstName": true,
      //    "lastName": true
      // }
    });
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
    throw new Error('Deprecated: use repository-based update methods');
  }

  async getAdminByEmail(email: string): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    return admin;
  }

  async update(email: string, data: Partial<AdminsDto>): Promise<Admin> {
    const result = await this.adminRepository.update({ email }, data as any);
    if (result.affected === 0) {
      throw new NotFoundException(`Admin with email ${email} not found`);
    }
    const admin = await this.adminRepository.findOne({ where: { email } });
    if (!admin) throw new NotFoundException(`Admin with email ${email} not found`);
    return admin;
  }

  // ----- AdminProfile CRUD -----
  async createProfile(adminId: number, data: CreateAdminProfileDto): Promise<AdminProfile> {
    const admin = await this.getAdminByID(adminId);
    const profile = this.profileRepository.create({ ...data, adminId, admin });
    return this.profileRepository.save(profile);
  }

  async getProfileByAdmin(adminId: number): Promise<AdminProfile> {
    const profile = await this.profileRepository.findOne({ where: { adminId }, relations: ['admin'] });
    if (!profile) throw new NotFoundException(`Profile for admin ${adminId} not found`);
    return profile;
  }

  async updateProfile(adminId: number, data: Partial<CreateAdminProfileDto>): Promise<AdminProfile> {
    const profile = await this.profileRepository.findOneBy({ adminId });
    if (!profile) throw new NotFoundException(`Profile for admin ${adminId} not found`);
    Object.assign(profile, data);
    return this.profileRepository.save(profile);
  }

  async deleteProfile(adminId: number): Promise<{ message: string }> {
    const res = await this.profileRepository.delete({ adminId });
    if (res.affected === 0) throw new NotFoundException(`Profile for admin ${adminId} not found`);
    return { message: `Profile for admin ${adminId} deleted` };
  }

  // ----- MenuItem CRUD -----
  async createMenuItem(adminId: number, data: CreateMenuItemDto): Promise<MenuItem> {
    const admin = await this.getAdminByID(adminId);
    const item = this.menuRepository.create({ ...data, admin });
    return this.menuRepository.save(item);
  }
  async getAllMenuItems(): Promise<any[]> {
  const items = await this.menuRepository.find({
    relations: ['admin'], 
    select: {
      id: true,
      name: true,
      description: true,
      price: true,
      isAvailable: true,
      createdAt: true,
      updatedAt: true,
      admin: {
        firstName: true
      }
    }
  });

  return items.map(item => ({
    id: item.id,
    name: item.name,
    description: item.description,
    price: item.price,
    isAvailable: item.isAvailable,
    createdAt: item.createdAt,
    updatedAt: item.updatedAt,
    createdBy: item.admin.firstName // custom field
  }));
}

  async getMenuItemsByAdmin(adminId: number): Promise<MenuItem[]> {
    await this.getAdminByID(adminId);
    return this.menuRepository.find({ where: { admin: { id: adminId } } });
  }

  async getMenuItemById(id: number): Promise<MenuItem> {
    const item = await this.menuRepository.findOne({ where: { id }, relations: ['admin'] });
    if (!item) throw new NotFoundException(`MenuItem with id ${id} not found`);
    return item;
  }

  async updateMenuItem(id: number, data: Partial<CreateMenuItemDto>): Promise<MenuItem> {
    const item = await this.getMenuItemById(id);
    Object.assign(item, data as any);
    return this.menuRepository.save(item);
  }

  async deleteMenuItem(id: number): Promise<{ message: string }> {
    const res = await this.menuRepository.delete({ id });
    if (res.affected === 0) throw new NotFoundException(`MenuItem with id ${id} not found`);
    return { message: `MenuItem ${id} deleted` };
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ access_token: string }> {
    const user = await this.adminRepository.findOne({ where: { email } });

    if (!user) {
      throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
    }


    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new HttpException('Invalid email or password', HttpStatus.BAD_REQUEST);
    }

    const payload = { id: user.id, email: user.email };
    const access_token = this.jwtService.sign(payload);

    return { access_token };
  }

}
