import { IsAlpha, IsEmail, IsIn, IsNotEmpty, IsOptional, IsString, Matches, MinLength } from 'class-validator';

export class User2Dto {

  @IsAlpha()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/.xysz$/i, { message: 'Email must be in aiub.edu domain' })
  email: string;

  @IsNotEmpty()
  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  file: string;

}
