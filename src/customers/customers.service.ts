import { Injectable } from '@nestjs/common';
import { CustomerDto } from './customers.dto';
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

  getAllCustomers(): object{
    return {success: true, data: customers};
  }

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

  createCustomer(data: CustomerDto): object{
    console.log(data.email)
    customers.push(data);

    
    return {message: 'Customer created successfully'};
    // return {firstName: customers[customers.length -1].firstName};
  }

  updateCustomer(email: string, data: CustomerDto): object{
    const index= customers.findIndex((person) => person.email === email);

    if(index==-1){
      return {message: 'Customer not found'};
    }
    customers[index]= data;
    // return {message: 'Customer updated successfully'};
    return data;
  }

  updateCustomerPartially(email: string, partialData: Partial<CustomerDto>): object {
  const index = customers.findIndex((c) => c.email === email);
  if (index === -1) {
    return { message: 'Customer not found' };
  }

  customers[index] = { ...customers[index], ...partialData }; 
  return {
    message: 'Customer updated partially',
    updatedCustomer: customers[index],
  };
}

  deleteCustomer(email: string): object{
    const index= customers.findIndex((person) => person.email === email);
    if (index==-1){
      return {message: 'Customer not found'};
    }
    customers.splice(index,1);
    return {message: `Customer with email ${email} deleted successfully`};
  }
}
