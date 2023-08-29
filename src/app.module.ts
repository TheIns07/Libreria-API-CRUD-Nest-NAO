import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';
import { AuthModule } from './auth/auth.module';
import { DB_ALIA, DB_HOST, DB_PASS, DB_USER, PORT } from './global/config';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        username: DB_USER,
        password: DB_PASS,
        host: DB_HOST,
        port: PORT,
        database: DB_ALIA,
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true
    }), BooksModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
