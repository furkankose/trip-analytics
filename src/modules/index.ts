import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { config } from 'dotenv';
import { resolve } from 'path';

import { AuthModule } from './auth/auth.module';
import { TripModule } from './trip/trip.module';

config({ path: resolve(process.cwd(), '.env') });

@Module({
  imports: [
    MongooseModule.forRoot(process.env.TA_MONGODB_CONNECTION_STRING),
    AuthModule,
    TripModule,
  ],
})
export class AppModule {}
