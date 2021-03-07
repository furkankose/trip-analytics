import { Injectable } from '@nestjs/common';

@Injectable()
export class TripHelper {
  convertKilometerToRadius(kilometer = 0) {
    const oneKilometerInRadius = 0.000156785;
    return kilometer * oneKilometerInRadius;
  }

  convertDateToQuery(date: Date, field: string, operatorKey: string) {
    if (!date) {
      return {};
    }

    return {
      [field]: {
        [operatorKey]: date,
      },
    };
  }
}
