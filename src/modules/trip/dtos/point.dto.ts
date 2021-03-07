import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsInt, Min } from 'class-validator';

export class PointDTO {
  @ApiProperty()
  @IsLatitude()
  latitude: number;

  @ApiProperty()
  @IsLongitude()
  longitude: number;

  @ApiProperty()
  @IsInt()
  @Min(0)
  radius: number;
}
