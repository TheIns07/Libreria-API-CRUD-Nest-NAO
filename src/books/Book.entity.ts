import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Book {

    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    title: string
    @Column()
    author: string
    @Column()
    description: string
    @Column({default: true})
    avaliable: boolean
    @Column({ type: 'datetime', default: () => { 'CURRENT_TIMESTAMP' } })
    createdAt: Date
    @Column({ unique: true })
    image: string

}   