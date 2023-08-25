import { Test, TestingModule } from '@nestjs/testing';
import { BooksController } from './books.controller';
import { Book } from './Book.entity';
import { BooksService } from './books.service';

describe('BooksController', () => {
  let controller: BooksController;
  let service: BooksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BooksController],
      providers: [BooksService]
    }).compile();

    controller = module.get<BooksController>(BooksController);
    service = module.get<BooksService>(BooksService);
  });

  describe('createBook', () => {
    it('should register a user', async () => {
      const bookObject: Book = {
        id: 2,
        title: "",
        author: "",
        description: "",
        avaliable: false,
        createdAt: new Date(),
        image: ""
      };

      jest.spyOn(service, 'createBook').mockResolvedValue(bookObject);

      expect(await controller.createBook(bookObject));
    });
  });

  describe('listBooks', () => {
    it('should list all the books', async () => {
      const allBooks: Book[] = [];
      allBooks.push(
        {
          id: 1,
          title: "La Sombra del Viento",
          author: "Carlos Ruiz Zafón",
          description: "Una novela misteriosa ambientada en la posguerra española.",
          avaliable: true,
          createdAt: new Date(),
          image: "imagen_libro_1.jpg"
        },
        {
          id: 2,
          title: "1984",
          author: "George Orwell",
          description: "Una distopía que explora temas de vigilancia y control totalitario.",
          avaliable: false,
          createdAt: new Date(),
          image: "imagen_libro_2.jpg"
        },
        {
          id: 3,
          title: "Cien años de soledad",
          author: "Gabriel García Márquez",
          description: "Una obra maestra del realismo mágico en la literatura latinoamericana.",
          avaliable: true,
          createdAt: new Date(),
          image: "imagen_libro_3.jpg"
        }
      )

      jest.spyOn(service, 'listBooks').mockResolvedValue(allBooks);

      expect(await controller.listBooks()).toBe(allBooks);
    });
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
