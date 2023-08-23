import { ApiProperty } from "@nestjs/swagger";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number

    @ApiProperty({example: 'Mexico Barbaro'})
    @Column({ unique: true })
    title: string

    @ApiProperty({example: 'Kenneth Turner'})
    @Column()
    author: string

    @ApiProperty({example: 'México Bárbaro fue el título de varios artículos publicados en la popular revista estadounidense, The American Magazine'})
    @Column()
    description: string

    @Column({default: true})
    avaliable: boolean

    @Column({ type: 'datetime', default: () => { 'CURRENT_TIMESTAMP' } })
    createdAt: Date

    @ApiProperty({example: 'https://www.elsotano.com/imagenes_grandes/9786079/978607967431.JPG'})
    @Column({ unique: true })
    image: string

}   