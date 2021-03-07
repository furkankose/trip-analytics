import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Point } from './point.schema';

export type TripDocument = Trip & mongoose.Document;

@Schema()
export class Trip {
  @ApiProperty()
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @ApiProperty()
  @Prop()
  distance_travelled: number;

  @ApiProperty()
  @Prop()
  year: number;

  @ApiProperty()
  @Prop()
  start: Point;

  @ApiProperty()
  @Prop()
  end: Point;

  @ApiProperty()
  @Prop()
  start_date: Date;

  @ApiProperty()
  @Prop()
  complete_date: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip).plugin(
  mongoosePaginate,
);
