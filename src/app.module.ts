import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BooksModule } from './books/books.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
        type: 'mysql',
        username: 'root',
        password: '1234',
        host: 'localhost',
        port: 3306,
        database: 'naonestdb',
        entities: [__dirname + '/**/*.entity.{js,ts}'],
        synchronize: true
    }), BooksModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
