import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { Book, BookSchema } from 'src/schemas/book.schema';

@Module({
  imports: [BooksModule],
  controllers: [BooksController],
  providers: [BooksService],
})
export class BooksModule {}