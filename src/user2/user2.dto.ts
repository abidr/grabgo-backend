import { IsAlpha, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class User2Dto {

  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/.xysz$/i, { message: 'Email must be in aiub.edu domain' })
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
