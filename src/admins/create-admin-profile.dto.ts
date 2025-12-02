import { IsString, IsOptional } from 'class-validator';

export class CreateAdminProfileDto {
  @IsString()
  address: string;

  @IsOptional()
  @IsString()
  emergencyContactName?: string;

  @IsOptional()
  @IsString()
  emergencyContactPhone?: string;

  @IsOptional()
  @IsString()
  bio?: string;
}
