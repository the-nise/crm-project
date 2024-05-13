import {
  IsString,
  IsEnum,
  IsStrongPassword,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@/constants/roles.enum';

export class UpdateUserDto {
  @ApiProperty({
    example: 'StrongPassword123!',
    description: 'Password for the user account',
  })
  @IsString()
  @IsStrongPassword({
    minLength: 8,
    minLowercase: 1,
    minNumbers: 1,
    minSymbols: 1,
    minUppercase: 1,
  })
  @IsOptional()
  password: string;

  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsString()
  @IsOptional()
  firstName: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsString()
  @IsOptional()
  lastName: string;

  @ApiProperty({
    enum: Role,
    enumName: 'Role',
    description: 'Role of the user',
  })
  @IsEnum(Role)
  @IsOptional()
  role: Role;
}
