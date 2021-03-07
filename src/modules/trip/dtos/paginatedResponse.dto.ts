import { ApiProperty } from '@nestjs/swagger';

export class PaginatedResponseDTO {
  @ApiProperty()
  docs: { [key: string]: any }[];

  @ApiProperty()
  totalDocs: number;

  @ApiProperty()
  limit: number;

  @ApiProperty()
  page?: number;

  @ApiProperty()
  totalPages: number;

  @ApiProperty()
  nextPage?: number | null;

  @ApiProperty()
  prevPage?: number | null;

  @ApiProperty()
  pagingCounter: number;

  @ApiProperty()
  hasPrevPage: boolean;

  @ApiProperty()
  hasNextPage: boolean;
}
