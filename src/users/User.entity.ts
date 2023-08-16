import { Column, PrimaryGeneratedColumn } from "typeorm"


export class User{
    @PrimaryGeneratedColumn()
    id: number
    @Column({ unique: true })
    username: string
    @Column()
    password: string
    @Column({ type: 'datetime', default: () => { 'CURRENT_TIMESTAMP' } })
    createdAt: Date
    @Column()
    authStrategy: string
}