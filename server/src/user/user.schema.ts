import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop()
  addresses: string[];

  @Prop()
  firstName: string;

  @Prop()
  lastName: string;

  @Prop()
  email: string;

  @Prop()
  amountInvested: number;

  @Prop()
  investments: Record<string, any>[];
}

export const UserSchema = SchemaFactory.createForClass(User);
