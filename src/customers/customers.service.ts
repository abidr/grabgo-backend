import { Injectable } from '@nestjs/common';
import { CustomerDto } from './customers.dto';
import { CustomerEntity } from './customers.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository } from 'typeorm';
const customers: CustomerDto[] = [
  // {
  //   firstName: 'Danny',
  //   lastName: 'Carter',
  //   email: 'danny.carter@example.com',
  //   phoneNumber: '1234567890',
  //   address: '123 Main St, Anytown, USA',
  //   password: '123',
  // },
  // {
  //   firstName: 'Carlos',
  //   lastName: 'Mendez',
  //   email: 'carlos.mendez@example.com',
  //   phoneNumber: '0987654321',
  //   address: '456 Elm St, Othertown, USA',
  //   password: '456',
  // },
];
@Injectable()
export class CustomersService {

  constructor(
    @InjectRepository(CustomerEntity)
    private customerRepository: Repository<CustomerEntity>) {}
  
  // getAllCustomers(): object{
  //   return {success: true, data: customers};
  // }
  async getAllCustomer(): Promise<CustomerEntity[]> {
   return await this.customerRepository.find();
  }

  async getNullCustomer(): Promise<CustomerEntity[]> {
   return await this.customerRepository.find(
    {
      where: { fullName: IsNull()}
    }
   );
  }
   
  // async getCustomerByEmail(email: string): Promise<CustomerEntity | null> {
  //   return await this.customerRepository.findOneBy({ email });
  // }

  getCustomerByEmail(email: string): object{
    const customer = customers.find((person) => person.email === email);
    if(customer){

    return {success: true, data: customers.map(person => ({
      email: person.email,
      phoneNumber: person.phoneNumber,}))};
    }else{
      return {message: 'Customer not found'};
    }
  }

 async createCustomer (data: CustomerDto) : Promise<object> {
  
  const entity = await this.customerRepository.create(data); 
    
   return this.customerRepository.save(entity);
 }

 async updateCustomer(email: string, data: CustomerDto): Promise<object | null> {

  //checking if customer exists or not
  const find= await this.customerRepository.findOneBy({email});
    if(!find){
      //if customer not found
      return {message: 'Customer not found'};
    }

    //if found
   const customer = await this.customerRepository.update(
    { email },
    {phoneNumber: data.phoneNumber,
    gender: data.gender
    }
  );

  return {message: "Customer is updated successfully"};
}

  // createCustomer(data: CustomerDto): object{
  //   console.log(data.email)
  //   customers.push(data);

    
  //   return {message: 'Customer created successfully'};
  //   // return {firstName: customers[customers.length -1].firstName};
  // }

  // updateCustomerPartially(email: string, partialData: Partial<CustomerDto>): object {
  // const index = customers.findIndex((c) => c.email === email);
  // if (index === -1) {
  //   return { message: 'Customer not found' };
  // }

  // customers[index] = { ...customers[index], ...partialData }; 
  // return {
  //   message: 'Customer updated partially',
  //   updatedCustomer: customers[index],
  // };}

  async deleteCustomer(id: string): Promise<object>{
   const find= await this.customerRepository.findOneBy({id:id});

    if (!find){
      return {message: 'Customer not found'};
    }

    await this.customerRepository.delete({id:id});
    return {message: `Customer with id ${id} deleted successfully`};
  }
}