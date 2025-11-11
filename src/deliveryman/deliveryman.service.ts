import { Injectable } from '@nestjs/common';
import { CreateDeliverymanDto } from './dto/create-deliveryman.dto';
import { UpdateDeliverymanDto } from './dto/update-deliveryman.dto';

const deliverymen: CreateDeliverymanDto[] = [
  {
    name: 'Rafi',
    email: 'rafi@mail.com',
    phoneNumber: '+8801712345678',
    address: 'Dhaka',
  },
  {
    name: 'Jahid',
    email: 'jahid@mail.com',
    phoneNumber: '+8801712345679',
    address: 'Chittagong',
  },
];

@Injectable()
export class DeliverymanService {
  
  getAll(): object {
    return {
      success: true,
      data: deliverymen,
    };
  }

  
  getByEmail(email: string): CreateDeliverymanDto | object {
    const deliveryman = deliverymen.find(d => d.email === email);
    if (!deliveryman) {
      return { message: 'Deliveryman not found' };
    }
    return deliveryman;
  }

  
  create(data: CreateDeliverymanDto): object {
    deliverymen.push(data);
    return { message: 'Deliveryman created', data };
  }

  
  update(email: string, data: UpdateDeliverymanDto): object {
    const index = deliverymen.findIndex(d => d.email === email);
    if (index === -1) {
      return { message: 'Deliveryman not found' };
    }
    deliverymen[index] = { ...deliverymen[index], ...data };
    return { message: 'Deliveryman updated', data: deliverymen[index] };
  }

  
  remove(email: string): object {
    const index = deliverymen.findIndex(d => d.email === email);
    if (index === -1) {
      return { message: 'Deliveryman not found' };
    }
    const removed = deliverymen.splice(index, 1);
    return { message: 'Deliveryman deleted', data: removed[0] };
  }
}
