import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type BookDocument = Document & Book;

@Schema({
  timestamps: true,
})
export class Book {
  @Prop({ unique: true, trim: true, required: true })
  title: string;

  @Prop({ trim: true })
  author: string;

  @Prop({ trim: true })
  description: string;

  @Prop({ trim: true })
  createdAt: Date;

  @Prop({ default: false })
  available: boolean;
}

export const BookSchema = SchemaFactory.createForClass(Book);