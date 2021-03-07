import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class DateRangeDTO {
  @ApiProperty()
  @IsOptional()
  @IsDate()
  start_date: Date;

  @ApiProperty()
  @IsOptional()
  @IsDate()
  complete_date: Date;
}
