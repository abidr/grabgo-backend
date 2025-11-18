import { IsString, IsDateString, Matches, IsUrl, IsEmail, IsEnum, Length } from 'class-validator';
export class AdminsDto {
  
  @IsString()
  @Matches(/^[^\d]*$/, {
    message: 'First name must not contain numbers',
  })
  firstName: string;
  @IsString()
  @Matches(/^[^\d]*$/, {
    message: 'Last name must not contain numbers',
  })
  lastName: string;
  @IsEmail()
  email: string;
  @IsString()
  @Length(11, 11, {
    message: 'Phone number must be 11 digits long',
  })
  phoneNumber: string;
  @IsString()
  @Matches(/[@#\$&]/, {
    message: 'Password must contain at least one of the following characters: @, #, $, &',
  })
  password: string;
  @IsEnum(['male', 'female'],{
    message: 'Gender must be either male or female',
  })
  gender: 'male' | 'female';
  @IsDateString()
  dateOfBirth: string;
  @IsUrl()
  socialMediaURL: string;
  
  country: string;
}
