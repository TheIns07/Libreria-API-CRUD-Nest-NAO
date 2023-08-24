import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('user')
export class Auth {

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
}