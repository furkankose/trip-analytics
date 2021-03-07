import { ApiProperty } from '@nestjs/swagger';
import { IsInt, Min, IsOptional } from 'class-validator';

export class PaginationDTO {
  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsOptional()
  page: number;

  @ApiProperty()
  @IsInt()
  @Min(1)
  @IsOptional()
  limit: number;
}
