import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { BookDTO } from './models/Book.dto';
import { Book } from './Book.entity';
import { Auth } from 'src/auth/auth.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('BooksController', () => {
  let controller: BooksController;
  const mockBooksService = {
    createBook: jest.fn(),
    listBooks: jest.fn(),
    listBookByID: jest.fn(),
    deleteBook: jest.fn(),
    updateBook: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService, {
        provide: getRepositoryToken(Book), 
          useClass: Repository,
      }],
    })
      .overrideProvider(BooksService)
      .useValue(mockBooksService)
      .compile();

    controller = module.get<BooksController>(BooksController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const newBook: BookDTO = {
        title: 'Libro de prueba',
        author: 'Autor de prueba',
        description: 'Descripcion de prueba',
        avaliable: true,
        createdAt: new Date(),
        image: 'test-image-url.png'
      };

      const createdBook = new Book();
      mockBooksService.createBook.mockReturnValue(createdBook);

      const result = await controller.createBook(newBook);

      expect(result).toBe(createdBook);
      expect(mockBooksService.createBook).toHaveBeenCalledWith(newBook);
    });
  });

  describe('updateBook', () => {
    it('should create a book', async () => {
      const newBook: BookDTO = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        avaliable: true,
        createdAt: new Date(),
        image: 'test-image-url'
      };

      const createdBook = new Book();
      mockBooksService.createBook.mockReturnValue(createdBook);
      const result = await controller.createBook(newBook);

      expect(result).toBe(createdBook);
      expect(mockBooksService.createBook).toHaveBeenCalledWith(newBook);
    });
  });

  describe('listBooks', () => {
    it('should return a list of books', async () => {
      const allBooks: Book[] = [];
      allBooks.push(
        {
          id: 1,
          title: "1984",
          author: "George Orwell",
          description: "Una distopía que explora temas de vigilancia y control totalitario.",
          avaliable: false,
          createdAt: new Date(),
          image: "imagen_libro_2.jpg",
          booksReserved: <Auth> null
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          description: "Una distopía que explora temas de vigilancia y control totalitario.",
          avaliable: false,
          createdAt: new Date(),
          image: "imagen_libro_2.jpg",
          booksReserved: <Auth> null
        },
        {
          id: 3,
          title: "Cien años de soledad",
          author: "Gabriel García Márquez",
          description: "Una obra maestra del realismo mágico en la literatura latinoamericana.",
          avaliable: true,
          createdAt: new Date(),
          image: "imagen_libro_3.jpg",
          booksReserved: <Auth> null
        }
      )
      mockBooksService.listBooks.mockReturnValue(allBooks);

      const result = await controller.listBooks();

      expect(result).toBe(allBooks);
      expect(mockBooksService.listBooks).toHaveBeenCalled();
    });
  });

  describe('listBook', () => {
    it('should return a single book by ID', async () => {
      const bookId = 2;
      const book: BookDTO = {
        title: "1984",
        author: "George Orwell",
        description: "Una distopía que explora temas de vigilancia y control totalitario.",
        avaliable: false,
        createdAt: new Date(),
        image: "imagen_libro_2.jpg"
      };
      mockBooksService.listBookByID.mockReturnValue(book);

      const result = await controller.listBook(bookId);

      expect(result).toBe(book);
      expect(mockBooksService.listBookByID).toHaveBeenCalledWith(bookId);
    });
  });

  describe('updateBook', () => {
    it('should update a book', async () => {
      const bookId = 2;
      const updatedBook: BookDTO = {
        title: "1984",
        author: "George Orwell",
        description: "Una distopía que explora temas de vigilancia y control totalitario en un futuro alternativo.", //Cambio de descripcion 
        avaliable: true, //disponible
        createdAt: new Date(),
        image: "imagen_libro_2.jpg"
      };
      mockBooksService.updateBook.mockReturnValue(updatedBook);

      const result = await controller.updateBook(bookId, updatedBook);

      expect(result).toBe(updatedBook);
      expect(mockBooksService.updateBook).toHaveBeenCalledWith(bookId, updatedBook);
    });
  });

  describe('deleteBook', () => {
    it('should delete a book', async () => {
      const bookId = 2;
      const deletedBook: BookDTO = {
        title: "1984",
        author: "George Orwell",
        description: "Una distopía que explora temas de vigilancia y control totalitario en un futuro alternativo.", 
        avaliable: true, 
        createdAt: new Date(),
        image: "imagen_libro_2.jpg"
      };
      mockBooksService.deleteBook.mockReturnValue(deletedBook);

      const result = await controller.deleteBook(bookId);

      expect(result).toBe(deletedBook);
      expect(mockBooksService.deleteBook).toHaveBeenCalledWith(bookId);
    });
  });

});
