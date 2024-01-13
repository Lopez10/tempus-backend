import { ApiProperty } from '@nestjs/swagger';

export class CreateBookingDto {
  @ApiProperty({
    example: 1,
    description: 'Number of people for the booking',
  })
  people: number;

  @ApiProperty({
    example: '10:00',
    description: 'Start time of the booking',
  })
  start: string;

  @ApiProperty({
    example: '11:00',
    description: 'End time of the booking',
  })
  end: string;

  @ApiProperty({
    example: '10/10/2021',
    description: 'Day of the booking',
  })
  day: string;

  @ApiProperty({
    example: '1',
    description: 'Area id of the booking',
  })
  areaId: string;

  @ApiProperty({
    example: 'test@test.com',
    description: 'The email of the client',
  })
  clientEmail: string;

  @ApiProperty({
    example: 'John',
    description: 'The name of the client',
  })
  clientName: string;

  @ApiProperty({
    example: 'Doe',
    description: 'The surname of the client',
  })
  clientSurname: string;

  @ApiProperty({
    example: '666777666',
    description: 'The phone of the client',
  })
  clientPhone: string;

  @ApiProperty({
    example: 'Hello! I am alergical to gluten',
    description: 'The comment of the client',
  })
  clientComment: string;

  @ApiProperty({
    example: '1',
    description: 'Table id of the booking',
  })
  tableId: string;

  @ApiProperty({
    example: ['1', '2'],
    description: 'Service ids of the booking',
  })
  serviceIds: string[];
}
