import { Controller, Post, Body, Get, Param, ParseIntPipe, Delete, Patch, HttpCode } from '@nestjs/common';
import { BookDTO } from './models/Book.dto';
import { BooksService } from './books.service';
import { Book } from './Book.entity';
import { BookUpdate } from './models/BookUpdate.dto';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { jwtAuthGuard } from '../auth/jwt/guard/jwtAuth.guard';
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator';

@ApiTags('books')
@Controller('books')
@ApiBearerAuth()
export class BooksController {

    constructor(private booksService: BooksService){}

    @UseGuards(jwtAuthGuard)
    @Post()
    @ApiResponse({
        status: 201,
        description: 'Create a book'
    })
    @ApiOperation({summary: 'Create a book'})
    @HttpCode(201)
    createBook(@Body() newBook: BookDTO){
        return this.booksService.createBook(newBook);
    }

    @UseGuards(jwtAuthGuard)
    @Get()
    @ApiResponse({
        status: 200,
        description: 'List of all books',
        type: [Book]
    })
    @ApiOperation({summary: 'Get books'})
    @HttpCode(200)
    listBooks(): Promise<Book[]>{
        return this.booksService.listBooks();
    }

    @UseGuards(jwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'List of a book',
        type: Book
    })
    @HttpCode(200)
    @ApiOperation({summary: 'Get a book'})
    @Get(':id')
    listBook (@Param('id', ParseIntPipe) id: number){
        return this.booksService.listBookByID(id);
    }

    @UseGuards(jwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Delete a book'
    })
    @ApiOperation({summary: 'Delete a book'})
    @HttpCode(200)
    @Delete(':id')
    deleteBook(@Param('id', ParseIntPipe) id: number){
        return this.booksService.deleteBook(id);
    }

    @UseGuards(jwtAuthGuard)
    @ApiResponse({
        status: 200,
        description: 'Edit a book'
    })
    @ApiOperation({summary: 'Edit a book'})
    @HttpCode(200)
    @Patch(':id')
    updateBook(@Param(('id'), ParseIntPipe) id: number, @Body() book: BookUpdate){
        return this.booksService.updateBook(id, book);
    }
}
