import { IsString, IsDateString, Matches, IsUrl, IsEmail } from 'class-validator';
export class AdminsDto {
  @IsString()
  @Matches(/^[^\d]*$/, {
    message: 'First name must not contain numbers',
  })
  firstName: string;
  @IsString()
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  phoneNumber: string;
  @IsString()
  @Matches(/[@#\$&]/, {
    message: 'Password must contain at least one of the following characters: @, #, $, &',
  })
  password: string;
  gender: 'male' | 'female';
  @IsDateString()
  dateOfBirth: string;
  @IsUrl()
  socialMediaURL: string;
}
