import { Controller, Get, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse } from '@nestjs/swagger';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { TripService } from './trip.service';
import { PointDTO } from './dtos/point.dto';
import { DateRangeDTO } from './dtos/dateRange.dto';
import { PaginationDTO } from './dtos/pagination.dto';
import { PaginatedResponseDTO } from './dtos/paginatedResponse.dto';
import { MinMaxDistanceResponseDTO } from './dtos/minMaxDistanceResponse.dto';
import { TripCountGroupedByVehicleYearDTO } from './dtos/tripCountGroupedByVehicleYear.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth('Authorization')
@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}

  @ApiOkResponse({
    description:
      'Returns all trips which are started in a region specified by a point and a radius',
  })
  @Get()
  async findAll(
    @Query() pointDto: PointDTO,
    @Query() dateRangeDto: DateRangeDTO,
    @Query() paginationDto: PaginationDTO,
  ): Promise<PaginatedResponseDTO> {
    return this.tripService.findAll(pointDto, dateRangeDto, paginationDto);
  }

  @ApiOkResponse({
    description:
      'Returns minimum and maximum distance travelled for the trips which are started in a region specified by a point and a radius.',
    type: MinMaxDistanceResponseDTO,
  })
  @Get('distance')
  async findMinMaxDistance(
    @Query() pointDto: PointDTO,
  ): Promise<MinMaxDistanceResponseDTO> {
    return this.tripService.findMinMaxTripDistance(pointDto);
  }

  @ApiOkResponse({
    description:
      'Returns the number of trips grouped by vehicle model year for the trips which are started in a region specified by a point and a radius.',
    type: [TripCountGroupedByVehicleYearDTO],
  })
  @Get('count')
  async findTripCountsGroupedByVehicleYear(
    @Query() pointDto: PointDTO,
  ): Promise<TripCountGroupedByVehicleYearDTO[]> {
    return this.tripService.findTripCountsGroupedByVehicleYear(pointDto);
  }
}
