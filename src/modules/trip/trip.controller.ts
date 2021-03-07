import { Controller, Get, UseGuards } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { PaginateResult } from 'mongoose-paginate-v2';

import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { Trip } from './schemas/trip.schema';
import { TripService } from './trip.service';
import { PointDTO } from './dtos/point.dto';
import { DateRangeDTO } from './dtos/dateRange.dto';
import { PaginationDTO } from './dtos/pagination.dto';

@UseGuards(JwtAuthGuard)
@Controller('trips')
export class TripController {
  constructor(private tripService: TripService) {}

  @Get()
  async findAll(
    @Query() pointDto: PointDTO,
    @Query() dateRangeDto: DateRangeDTO,
    @Query() paginationDto: PaginationDTO,
  ): Promise<PaginateResult<Trip>> {
    return this.tripService.findAll(pointDto, dateRangeDto, paginationDto);
  }

  @Get('distance')
  async findMinMaxDistance(@Query() pointDto: PointDTO) {
    return this.tripService.findMinMaxTripDistance(pointDto);
  }

  @Get('count')
  async findTripCountsGroupedByVehicleYear(@Query() pointDto: PointDTO) {
    return this.tripService.findTripCountsGroupedByVehicleYear(pointDto);
  }
}
