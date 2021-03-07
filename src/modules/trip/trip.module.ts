import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Trip, TripSchema } from './schemas/trip.schema';
import { TripHelper } from './trip.helper';
import { TripService } from './trip.service';
import { TripController } from './trip.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  providers: [TripHelper, TripService],
  controllers: [TripController],
})
export class TripModule {}
