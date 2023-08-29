import { ApiProperty } from '@nestjs/swagger';
import { Book } from '../books/Book.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class Auth {

  @ApiProperty({ example: 1 })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ example: 'Arturo Cervantes' })
  @Column({ unique: true })
  name: string;

  @ApiProperty({ example: 'elbananero' })
  @Column({ unique: true })
  username: string;

  @ApiProperty({
    example: 'rw3efrt4ygv',
  })
  @Column()
  password: string;

  @OneToMany(() => Book, book => book.booksReserved)
  booksReserved: Book[]
}