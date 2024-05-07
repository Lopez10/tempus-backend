import { ApiProperty } from '@nestjs/swagger';

export class CreateRestaurantDto {
  @ApiProperty({
    example: 'restaurant@example.com',
    description: 'Email of the restaurant',
  })
  email: string;

  @ApiProperty({
    example: 'Restaurant',
    description: 'Name of the restaurant',
  })
  name: string;

  @ApiProperty({
    example: 'This is a description',
    description: 'Description of the restaurant',
  })
  description: string;

  @ApiProperty({
    example: '200',
    description: 'The capacity of the restaurant',
  })
  capacity: number;
}
