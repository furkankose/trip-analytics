import { ApiProperty } from '@nestjs/swagger';

export class TripCountGroupedByVehicleYearDTO {
  @ApiProperty()
  year: number;

  @ApiProperty()
  count: number;
}
