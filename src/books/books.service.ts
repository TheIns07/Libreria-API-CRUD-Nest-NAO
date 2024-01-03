import { HttpException, Injectable, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './Book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDTO } from './models/Book.dto';
import { BookUpdate } from './models/BookUpdate.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async createBook(book: BookDTO) {
    if (await this.bookRepository.findOne({ where: { title: book.title } })) {
      return new HttpException('Libro ya registrado.', HttpStatus.CONFLICT);
    }
    const newBook = this.bookRepository.create(book);
    return this.bookRepository.save(newBook);
  }

  listBooks() {
    return this.bookRepository.find();
  }

  async listBookByID(id: number) {
    const book = await this.bookRepository.findOne({ where: { id: id } });
    if (!book) {
      return new HttpException('Libro no encontrado.', HttpStatus.NOT_FOUND);
    }
    return book;
  }

  async deleteBook(id: number) {
    const book = await this.bookRepository.findOne({ where: { id } });
    if (!book) {
      return new HttpException('Libro no encontrado.', HttpStatus.NOT_FOUND);
    }
    return this.bookRepository.delete({ id: id });
  }

  updateBook(id: number, book: BookUpdate) {
    return this.bookRepository.update({ id: id }, book);
  }
}
