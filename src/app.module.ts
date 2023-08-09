import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BooksController } from './tasks/books.controller';
import { BooksService } from './tasks/books.service';
import { BooksModule } from './tasks/books.module';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    }), 
    BooksModule],
  controllers: [AppController, BooksController],
  providers: [AppService, BooksService],
})
export class AppModule {}
