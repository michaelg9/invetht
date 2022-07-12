import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import 'dotenv/config';

const mongodb_user = process.env.MONGODB_USER;
const mongodb_pw = process.env.MONGODB_PW;
const mongodb_suffix = process.env.MONGODB_SUFFIX;

@Module({
  imports: [
    ConfigModule.forRoot({}),
    MongooseModule.forRoot(
      `mongodb+srv://${mongodb_user}:${mongodb_pw}@${mongodb_suffix}`,
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
