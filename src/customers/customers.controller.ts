import { Controller, Body, Delete, Post, Get, Patch, Param, Put, Query, ValidationPipe, UsePipes} from '@nestjs/common';
import { CustomersService } from './customers.service';
import { CustomerDto } from './customers.dto';


@Controller('customers')
@UsePipes(new ValidationPipe())
export class CustomersController {
  constructor (private readonly customersService: CustomersService) {}

  @Get()
  getAllCustomers(): object{
    return this.customersService.getAllCustomers();
  }

  @Get('by-email')
  getCustomerByEmail(@Query('email') email: string): object{
    return this.customersService.getCustomerByEmail(email);
  }

  @Post()
  createCustomer(@Body() customerData: CustomerDto): object{
    return this.customersService.createCustomer(customerData);
  }

  @Put (':email')
  updateCustomer(@Param('email') email: string, @Body() customerData: CustomerDto): object{
    return this.customersService.updateCustomer(email, customerData);
  }

  @Patch (':email')
  updateCustomerPartially(@Param('email') email: string, @Body() partialData: Partial<CustomerDto>): object {
    return this.customersService.updateCustomerPartially(email, partialData);
  }

  @Delete (':email')
  deleteCustomer(@Param('email') email: string): object {
    return this.customersService.deleteCustomer(email);
  }

}
