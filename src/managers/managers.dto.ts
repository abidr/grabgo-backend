import {
  IsAlpha,
  IsDateString,
  IsEmail,
  IsIn,
  IsString,
  Length,
  MinLength,
  Validate,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

@ValidatorConstraint()
export class StartsWith implements ValidatorConstraintInterface {
  validate(text: string) {
    return text.startsWith('01');
  }
}

export class ManagerDto {
  @IsAlpha()
  firstName: string;

  @IsAlpha()
  lastName: string;

  @IsEmail()
  email: string;

  @Validate(StartsWith, {
    message: 'Phone number must start with 01',
  })
  @Length(11, 11)
  phoneNumber: string;

  @MinLength(6)
  password: string;

  @IsIn(['male', 'female'])
  gender: 'male' | 'female';

  @IsDateString()
  dateOfBirth: string;

  @IsString()
  age: string;

  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';

  file?: string;
}

export class ManagerSignInDto {
  @IsEmail()
  email: string;

  @MinLength(6)
  password: string;
}
