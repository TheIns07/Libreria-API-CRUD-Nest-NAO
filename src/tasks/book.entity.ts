
import {Entity,Column, PrimaryGeneratedColumn} from 'typeorm'

@Entity({name: 'books'})
class Book{
    @PrimaryGeneratedColumn()
    id: number
    @Column({unique: true})
    title: string
    @Column()
    author: string
    @Column()
    description: string
    @Column()
    avaliable: boolean
    @Column({type: 'datetime', default: () => {'CURRENT_TIMESTAMP'}})
    createdAt: Date
}

export default Book;