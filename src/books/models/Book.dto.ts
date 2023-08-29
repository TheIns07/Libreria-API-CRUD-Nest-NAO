import { ApiProperty } from "@nestjs/swagger"
import {IsBoolean, IsDate, IsNotEmpty, IsString, Max, MaxLength, MinLength} from 'class-validator'

export class BookDTO{
    @ApiProperty({example: 'Mexico Barbaro'})
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(200)
    title: string

    @ApiProperty({example: 'Kenneth Turner'})
    @IsString()
    @IsNotEmpty()
    @MinLength(2)
    @MaxLength(150)
    author: string

    @ApiProperty({example: 'México Bárbaro fue el título de varios artículos publicados en la popular revista estadounidense, The American Magazine'})
    @IsString()
    @IsNotEmpty()
    @MinLength(10)
    @MaxLength(700)
    description: string

    @ApiProperty({example: true})
    @IsBoolean()
    avaliable: boolean

    @ApiProperty({example: new Date()})
    @IsDate()
    @IsNotEmpty()
    createdAt: Date

    @ApiProperty({example: 'https://www.elsotano.com/imagenes_grandes/9786079/978607967431.JPG'})
    @IsString()
    @IsNotEmpty()
    image: string
}