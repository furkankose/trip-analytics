import { ApiProperty } from '@nestjs/swagger';

export class MinMaxDistanceResponseDTO {
  @ApiProperty()
  minimum: number;

  @ApiProperty()
  maximum: number;
}
