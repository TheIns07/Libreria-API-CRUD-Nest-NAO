import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './Book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { BookDTO } from './models/Book.dto';
import { BookUpdate } from './models/BookUpdate.dto';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>
    ) {}

    createBook(book: BookDTO){
        const newBook = this.bookRepository.create(book);
        return this.bookRepository.save(newBook);
    }

    listBooks(){
        return this.bookRepository.find();
    }

    listBookByID(id: number){
        return this.bookRepository.findOne({ where:{ id: id}});
    }

    deleteBook(id: number){
        return this.bookRepository.delete({id: id});
    }

    updateBook(id: number, book: BookUpdate){
        return this.bookRepository.update({id: id}, book);
    }
}