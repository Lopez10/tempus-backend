import { ApiProperty } from '@nestjs/swagger';

export class RetrieveAreaDTO {
  @ApiProperty({
    example: '1',
    description: 'Id of the area',
  })
  id: string;
}
