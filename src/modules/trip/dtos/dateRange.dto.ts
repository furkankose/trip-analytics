import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsOptional } from 'class-validator';

export class DateRangeDTO {
  @ApiProperty({ required: false, example: '2016-06-23T22:30:00.000Z' })
  @IsOptional()
  @IsDate()
  start_date?: Date;

  @ApiProperty({ required: false, example: '2016-06-30T08:00:00.000Z' })
  @IsOptional()
  @IsDate()
  complete_date?: Date;
}
