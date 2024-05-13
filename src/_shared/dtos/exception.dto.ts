import { ApiProperty } from '@nestjs/swagger';

export class ExceptionDto {
  @ApiProperty({
    example: 400,
    description: 'Status code of the error',
  })
  statusCode: number;

  @ApiProperty({
    example: 'Invalid data provided',
    description: 'Error message',
  })
  message: string;

  @ApiProperty({
    example: 'Bad Request',
    description: 'Name of the error',
  })
  error: string;
}
