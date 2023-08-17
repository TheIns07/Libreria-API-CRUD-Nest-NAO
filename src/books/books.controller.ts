import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch } from '@nestjs/common';
import { BookDTO } from './models/Book.dto';
import { BooksService } from './books.service';
import { Book } from './Book.entity';
import { BookUpdate } from './models/BookUpdate.dto';

@Controller('books')
export class BooksController {

    constructor(private booksService: BooksService){}
    @Post()
    createBook(@Body() newBook: BookDTO){
        return this.booksService.createBook(newBook);
    }

    @Get()
    listBooks(): Promise<Book[]>{
        return this.booksService.listBooks();
    }

    @Get(':id')
    listBook (@Param('id', ParseIntPipe) id: number){
        return this.booksService.listBookByID(id);
    }

    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number){
        return this.booksService.deleteBook(id);
    }

    @Patch(':id')
    updateBook(@Param(('id'), ParseIntPipe) id: number, @Body() book: BookUpdate){
        return this.booksService.updateBook(id, book);
    }


}
