import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, HttpStatus } from '@nestjs/common';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Book } from './Book.entity';
import { BookDTO } from './models/Book.dto';
import { BooksService } from './books.service';

describe('BooksService', () => {
  let service: BooksService;
  const mockBookRepository = {
    create: jest.fn(),
    findOne: jest.fn(),
    find: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BooksService,
        {
          provide: getRepositoryToken(Book),
          useValue: mockBookRepository,
        },
      ],
    }).compile();

    service = module.get<BooksService>(BooksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('createBook', () => {
    it('should create a book', async () => {
      const bookDto: BookDTO = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        avaliable: true,
        createdAt: new Date(),
        image: 'test-image-url',
      };

      const createdBook = new Book();
      mockBookRepository.create.mockReturnValue(createdBook);

      const result = await service.createBook(bookDto);

      expect(result).toBe(createdBook);
      expect(mockBookRepository.create).toHaveBeenCalledWith(bookDto);
      expect(mockBookRepository.create).toHaveBeenCalledWith(createdBook);
    });

    it('should return a conflict exception if book already exists', async () => {
      const bookDto: BookDTO = {
        title: 'Test Book',
        author: 'Test Author',
        description: 'Test Description',
        avaliable: true,
        createdAt: new Date(),
        image: 'test-image-url',
      };

      mockBookRepository.findOne.mockReturnValue(bookDto);

      await expect(service.createBook(bookDto)).rejects.toThrowError(
        new HttpException('Libro ya registrado.', HttpStatus.CONFLICT)
      );
    });
  });

});