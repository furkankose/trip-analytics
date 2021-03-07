import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';

export type PointDocument = Point & mongoose.Document;

@Schema()
export class Point {
  @Prop()
  type: string;

  @Prop()
  coordinates: number[];
}

export const PointSchema = SchemaFactory.createForClass(Point);
