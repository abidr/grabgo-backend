import { Injectable } from '@nestjs/common';
import { User2Dto } from './user2.dto';

const users: User2Dto[] = []; // in-memory

@Injectable()
export class User2Service {
  getAll() {
    return { success: true, data: users };
  }

  getByEmail(email: string) {
    return users.find(u => u.email === email) ?? { message: 'User not found' };
  }

  create(data: User2Dto) {
    users.push(data);
    return data;
  }

  update(email: string, data: User2Dto) {
    const i = users.findIndex(u => u.email === email);
    if (i === -1) return { message: 'User not found' };
    users[i] = data;
    return data;
  }

  
  remove(email: string) {
    const i = users.findIndex(u => u.email === email);
    if (i === -1) return { message: 'User not found' };
    users.splice(i, 1);
    return { message: `User with email ${email} deleted successfully` };
  }
}
