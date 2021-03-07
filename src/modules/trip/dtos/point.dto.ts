import { ApiProperty } from '@nestjs/swagger';
import { IsLatitude, IsLongitude, IsInt, Min } from 'class-validator';

export class PointDTO {
  @ApiProperty({ example: 31.17821068 })
  @IsLatitude()
  latitude: number;

  @ApiProperty({ example: -97.38887025 })
  @IsLongitude()
  longitude: number;

  @ApiProperty({ example: 5 })
  @IsInt()
  @Min(0)
  radius: number;
}
