import { TripHelper } from '../../src/modules/trip/trip.helper';

describe('TripHelper', () => {
  let tripHelper: TripHelper;

  beforeAll(() => {
    tripHelper = new TripHelper();
  });

  describe('convertKilometerToRadius', () => {
    it(`should return 0`, () => {
      const expectedRadius = 0;
      const radius = tripHelper.convertKilometerToRadius();

      expect(radius).toStrictEqual(expectedRadius);
    });

    it(`should return 0`, () => {
      const kilometer = 0;
      const expectedRadius = 0;
      const radius = tripHelper.convertKilometerToRadius(kilometer);

      expect(radius).toStrictEqual(expectedRadius);
    });

    it(`should return 0.000156785`, () => {
      const kilometer = 1;
      const expectedRadius = 0.000156785;
      const radius = tripHelper.convertKilometerToRadius(kilometer);

      expect(radius).toStrictEqual(expectedRadius);
    });

    it(`should return 0.002351775`, () => {
      const kilometer = 15;
      const expectedRadius = 0.002351775;
      const radius = tripHelper.convertKilometerToRadius(kilometer);

      expect(radius).toStrictEqual(expectedRadius);
    });
  });

  describe('convertDateToQuery', () => {
    it(`should return empty query object`, () => {
      const field = 'started_date';
      const operatorKey = '$gte';
      const date = undefined;
      const expectedQuery = {};
      const query = tripHelper.convertDateToQuery(date, field, operatorKey);

      expect(query).toStrictEqual(expectedQuery);
    });

    it(`should return query object`, () => {
      const field = 'complete_date';
      const operatorKey = '$lte';
      const date = new Date('2016-06-23T22:30:00.000Z');
      const expectedQuery = { [field]: { [operatorKey]: date } };
      const query = tripHelper.convertDateToQuery(date, field, operatorKey);

      expect(query).toStrictEqual(expectedQuery);
    });
  });
});
