import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PaginateModel } from 'mongoose-paginate-v2';

import { TripHelper } from './trip.helper';
import { Trip, TripDocument } from './schemas/trip.schema';
import { PointDTO } from './dtos/point.dto';
import { DateRangeDTO } from './dtos/dateRange.dto';
import { PaginationDTO } from './dtos/pagination.dto';
import { PaginatedResponseDTO } from './dtos/paginatedResponse.dto';
import { MinMaxDistanceResponseDTO } from './dtos/minMaxDistanceResponse.dto';
import { TripCountGroupedByVehicleYearDTO } from './dtos/tripCountGroupedByVehicleYear.dto';

@Injectable()
export class TripService {
  constructor(
    @InjectModel(Trip.name)
    private tripModel: PaginateModel<TripDocument>,
    private tripHelper: TripHelper,
  ) {}

  async findAll(
    pointDto: PointDTO,
    dateRangeDto: DateRangeDTO,
    paginationDto: PaginationDTO,
  ): Promise<PaginatedResponseDTO> {
    const { longitude, latitude } = pointDto;
    const radius = this.tripHelper.convertKilometerToRadius(pointDto.radius);

    const startDate = this.tripHelper.convertDateToQuery(
      dateRangeDto.start_date,
      'start_date',
      '$gte',
    );

    const completeDate = this.tripHelper.convertDateToQuery(
      dateRangeDto.complete_date,
      'complete_date',
      '$lte',
    );

    const query = {
      ...startDate,
      ...completeDate,
      start: {
        $geoWithin: {
          $centerSphere: [[longitude, latitude], radius],
        },
      },
    };

    return this.tripModel.paginate(query, {
      ...paginationDto,
      forceCountFn: true,
    });
  }

  async findMinMaxTripDistance(
    pointDto: PointDTO,
  ): Promise<MinMaxDistanceResponseDTO> {
    const { longitude, latitude } = pointDto;
    const radius = this.tripHelper.convertKilometerToRadius(pointDto.radius);

    const match = {
      $match: {
        start: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], radius],
          },
        },
      },
    };

    const group = {
      $group: {
        _id: null,
        minimum: { $min: '$distance_travelled' },
        maximum: { $max: '$distance_travelled' },
      },
    };

    const project = {
      $project: {
        _id: 0,
        minimum: 1,
        maximum: 1,
      },
    };

    const [distanceTravelled] = await this.tripModel.aggregate([
      match,
      group,
      project,
    ]);

    return distanceTravelled;
  }

  async findTripCountsGroupedByVehicleYear(
    pointDto: PointDTO,
  ): Promise<TripCountGroupedByVehicleYearDTO[]> {
    const { longitude, latitude } = pointDto;
    const radius = this.tripHelper.convertKilometerToRadius(pointDto.radius);

    const match = {
      $match: {
        start: {
          $geoWithin: {
            $centerSphere: [[longitude, latitude], radius],
          },
        },
      },
    };

    const group = {
      $group: {
        _id: '$year',
        count: { $sum: 1 },
      },
    };

    const project = {
      $project: {
        year: '$_id',
        _id: 0,
        count: 1,
      },
    };

    return this.tripModel.aggregate([match, group, project]);
  }
}
