import { User } from '@/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class AuthDto {
  @ApiProperty({
    description: 'User data returned upon authentication',
    type: User,
  })
  user: User;
}
