import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsOptional } from 'class-validator';

export class PaginationDTO {
  @ApiProperty({ required: false, example: 1 })
  @IsInt()
  @Min(1)
  @IsOptional()
  page?: number;

  @ApiProperty({ required: false, example: 10 })
  @IsInt()
  @Min(1)
  @IsOptional()
  limit?: number;
}
