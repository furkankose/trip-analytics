import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../../../src/modules';
import { TripService } from '../../../src/modules/trip/trip.service';
import * as tripData from './trip.data';

describe('TripService', () => {
  let app: INestApplication;
  let tripService: TripService;
  let point;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = await moduleFixture.createNestApplication().init();
    tripService = app.get<TripService>(TripService);
    point = {
      latitude: 31.17821068,
      longitude: -97.38887025,
      radius: 5,
    };
  });

  describe('findAll', () => {
    it('should return paginated trip results', async () => {
      const dateRange = {};
      const pagination = {};

      const result = await tripService.findAll(point, dateRange, pagination);
      const expectedResult = tripData.findAll;

      expect(result.totalDocs).toEqual(expectedResult.totalDocs);
    });
  });

  describe('findMinMaxTripDistance', () => {
    it('should return minimum and maximum trip distance', async () => {
      const result = await tripService.findMinMaxTripDistance(point);
      const expectedResult = tripData.findMinMaxTripDistance;

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findTripCountsGroupedByVehicleYear', () => {
    it('should return trip counts grouped by vehicle year', async () => {
      const result = await tripService.findTripCountsGroupedByVehicleYear(
        point,
      );
      const expectedResult = tripData.findTripCountsGroupedByVehicleYear;

      expect(result).toEqual(expectedResult);
    });
  });
});
