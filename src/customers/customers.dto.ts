import { IsAlpha, IsEmail, IsIn, IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';

export class CustomerDto{
  // @IsAlpha()
  // firstName: string;
  // @IsAlpha()
  // lastName: string;
  // email: string;
  // phoneNumber: string;
  // address: string;
  // password: string;

  @IsNotEmpty()
    @IsEmail()
    @Matches(/@aiub\.edu$/i, { message: 'Email must be in aiub.edu domain' })
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @Matches(/[A-Z]/, { message: 'Password must contain at least one uppercase letter' })
    password: string;
  
    @IsNotEmpty()
    @IsIn(['male', 'female'])
    gender: 'male' | 'female';
  
    @IsNotEmpty()
    @Matches(/^\d+$/, { message: 'Phone number must contain only numbers' })
    phoneNumber: string;

}