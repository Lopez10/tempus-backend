import { ApiProperty } from '@nestjs/swagger';

export class RetrieveBookingDto {
  @ApiProperty({
    example: '1',
    description: 'Id of the booking',
  })
  id: string;
}
