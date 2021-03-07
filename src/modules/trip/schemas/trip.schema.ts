import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import * as mongoosePaginate from 'mongoose-paginate-v2';

import { Point } from './point.schema';

export type TripDocument = Trip & mongoose.Document;

@Schema()
export class Trip {
  @Prop()
  _id: mongoose.Schema.Types.ObjectId;

  @Prop()
  distance_travelled: number;

  @Prop()
  year: number;

  @Prop()
  start: Point;

  @Prop()
  end: Point;

  @Prop()
  start_date: Date;

  @Prop()
  complete_date: Date;
}

export const TripSchema = SchemaFactory.createForClass(Trip).plugin(
  mongoosePaginate,
);
